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

const editFormData = async (formData) => {
  try {
    // Prepare the SQL query
    const sql = `
      UPDATE stocks 
      SET 
        name = ?, 
        buy_amount = ?, 
        sell_amount = ?, 
        quantity = ?, 
        updated_at = NOW()
      WHERE id = ?
    `;

    // Execute the query with formData
    const [result] = await mysqlDb.execute(sql, [
      formData.name,
      formData.buyAmount,
      formData.sellAmount,
      formData.quantity,
      formData.id, // Use the ID to identify which record to update
    ]);

    // Return success response
    return {
      success: true,
      message: 'Data updated successfully.',
      data: {
        affectedRows: result.affectedRows,
      },
    };
  } catch (error) {
    // Handle and log errors
    console.error('Error updating data:', error);
    return {
      success: false,
      message: error.message || 'Error updating data.',
      error,
    };
  }
};

// Fetch stocks data ordered by id DESC
const fetchStocksData = async () => {
  try {
    // Prepare the SQL query
    const sql = `SELECT *
                 FROM stocks
                 ORDER BY id DESC`

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
    // Prepare the SQL query for inserting into the `sales` table
    const salesSql = `
      INSERT INTO sales (stock_id, user_id, unit_price, total_amount, quantity, sell_date, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    // Execute the query to save the sale
    const [salesResult] = await mysqlDb.execute(salesSql, [
      saleData.stock_id,
      saleData.user_id,
      saleData.unit_price,
      saleData.total_amount,
      saleData.quantity,
      saleData.sell_date,
    ]);

    // Update the stock quantity in the `stocks` table
    const updateStockSql = `
      UPDATE stocks
      SET quantity = quantity - ?
      WHERE id = ?
    `;

    await mysqlDb.execute(updateStockSql, [saleData.quantity, saleData.stock_id]);

    // Return success response
    return {
      success: true,
      message: 'Sale saved successfully.',
      data: {
        affectedRows: salesResult.affectedRows,
        insertId: salesResult.insertId,
      },
    };
  } catch (error) {
    // Handle and log errors
    console.error('Error saving sale:', error);
    return {
      success: false,
      message: error.message || 'Error saving sale.',
      error,
    };
  }
};


export {
  saveFormData,
  editFormData,
  fetchStocksData,
  saveSale
}
