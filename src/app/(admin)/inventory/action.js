'use server'

import mysqlDb from "@/app/lib/database/mysql"
import {generateUniqueString} from "@/app/utils/generator"
import fs from "fs"
import path from "path"

// Save form data with generated barcode
const saveFormData = async (formData) => {
  try {
    // Generate a unique barcode
    const barcode = await generateUniqueString()
    // console.log(formData)
    let photoName = null
    if(formData.stockPicture) {
      photoName = await fileUploadToServer(formData)
    }

    // Prepare the SQL query
    const sql = `
        INSERT INTO stocks (user_id, name, barcode, buy_amount, sell_amount, quantity, photo, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `
    // Execute the query with formData and generated barcode
    const [result] = await mysqlDb.execute(sql, [
      formData.user_id,
      formData.name,
      barcode, // Add the generated barcode
      formData.buyAmount,
      formData.sellAmount,
      formData.quantity,
      photoName, // Add the photo name to the database
    ])

    // Return success response
    return {
      success: true,
      message: 'Data saved successfully.',
      data: {
        affectedRows: result.affectedRows,
        insertId: result.insertId,
        barcode, // Include the barcode in the response
      },
    }
  } catch (error) {
    // Handle and log errors
    console.log('Error saving data:', error)
    return {
      success: false,
      message: error || 'Error saving data.',
      error,
    }
  }
}

const fileUploadToServer = async (formData) => {
  const { stockPicture } = formData
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'stocks')

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  // Generate a unique file name
  const ext = path.extname(stockPicture.name)
  const fileName = `${Date.now()}${ext}`
  const filePath = path.join(uploadDir, fileName)

  // Move the file to the upload directory
  const fileBuffer = await stockPicture.arrayBuffer()
  fs.writeFileSync(filePath, Buffer.from(fileBuffer))

  return fileName
}

const editFormData = async (formData) => {
  try {
    let photoName = null

    // Fetch the existing photo name from the database
    const [existingData] = await mysqlDb.execute('SELECT photo FROM stocks WHERE id = ?', [formData.id])
    const existingPhotoName = existingData[0]?.photo

    // If a new photo is uploaded
    if (formData.stockPicture &&  typeof formData.stockPicture  !== "string") {
      // Delete the previous photo if it exists
      if (existingPhotoName) {
        const oldFilePath = path.join(process.cwd(), 'public', 'uploads', 'stocks', existingPhotoName)
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath) // Delete the old file
        }
      }

      // Upload the new photo
      photoName = await fileUploadToServer(formData)
    }

    // Prepare the SQL query
    const sql = `
      UPDATE stocks 
      SET
        updated_id = ?,
        name = ?, 
        buy_amount = ?, 
        sell_amount = ?, 
        quantity = ?, 
        ${photoName ? 'photo = ?,' : ''} 
        updated_at = NOW()
      WHERE id = ?
    `

    // Parameters for the SQL query
    const params = [
      formData.user_id,
      formData.name,
      formData.buyAmount,
      formData.sellAmount,
      formData.quantity,
      ...(photoName ? [photoName] : []), // Include photoName only if it exists
      formData.id,
    ]

    // Execute the query with formData
    const [result] = await mysqlDb.execute(sql, params)

    // Return success response
    return {
      success: true,
      message: 'Data updated successfully.',
      data: {
        affectedRows: result.affectedRows,
      },
    }
  } catch (error) {
    // Handle and log errors
    console.error('Error updating data:', error)
    return {
      success: false,
      message: error.message || 'Error updating data.',
      error,
    }
  }
}

// Fetch stocks data ordered by id DESC
const fetchStocksData = async () => {
  try {

    // Prepare the SQL query
    const sql = `SELECT * FROM stocks ORDER BY id DESC`

    // Execute the query
    const [rows] = await mysqlDb.execute(sql)

    // Return success response with fetched data
    return {
      success: true,
      message: 'Data fetched successfully.',
      data: rows, // The data fetched from the table
    }
  } catch (error) {
    // Handle and log errors
    console.error('Error fetching data:', error)
    return {
      success: false,
      message: error.message || 'Error fetching data.',
      error,
    }
  }
}

// Save sale data to the database
const saveSale = async (saleData) => {
  try {

    const voucherCode = await generateUniqueString()
    const notes = saleData.notes !== undefined ? saleData.notes : null
    // Prepare the SQL query for inserting into the `sales` table
    const salesSql = `
      INSERT INTO sales (voucher_codes, stock_id, user_id, unit_price, total_amount, quantity, sell_date, notes, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `

    // Execute the query to save the sale
    const [salesResult] = await mysqlDb.execute(salesSql, [
      voucherCode, // Generate a unique voucher code
      saleData.stock_id,
      saleData.user_id,
      saleData.unit_price,
      saleData.total_amount,
      saleData.quantity,
      saleData.sell_date,
      notes, // Use the default value if notes is undefined
    ])

    // Update the stock quantity in the `stocks` table
    const updateStockSql = `
      UPDATE stocks
      SET quantity = quantity - ?
      WHERE id = ?
    `

    await mysqlDb.execute(updateStockSql, [saleData.quantity, saleData.stock_id])

    // Return success response
    return {
      success: true,
      message: 'Sale saved successfully.',
      data: {
        affectedRows: salesResult.affectedRows,
        insertId: salesResult.insertId,
      },
    }
  } catch (error) {
    // Handle and log errors
    console.error('Error saving sale:', error)
    return {
      success: false,
      message: error.message || 'Error saving sale.',
      error,
    }
  }
}


export {
  saveFormData,
  editFormData,
  fetchStocksData,
  saveSale
}
