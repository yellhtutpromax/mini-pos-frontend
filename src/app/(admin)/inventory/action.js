'use server'

import mysqlDb from "@/app/lib/database/mysql"
import {generateBarcode} from "@/app/utils/generator"

// Save form data with generated barcode
const saveFormData = async (formData) => {
  try {
    // Generate a unique barcode
    const barcode = await generateBarcode()

    // Prepare the SQL query
    const sql = `
      INSERT INTO stocks (name, barcode, buy_amount, sell_amount, quantity, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `

    // Execute the query with formData and generated barcode
    const [result] = await mysqlDb.execute(sql, [
      formData.name,
      barcode, // Add the generated barcode
      formData.buyAmount,
      formData.sellAmount,
      formData.quantity,
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
    console.error('Error saving data:', error)
    return {
      success: false,
      message: error.message || 'Error saving data.',
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

export { saveFormData, fetchStocksData }
