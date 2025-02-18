'use server'
import mysqlDb from "@/app/lib/database/mysql"

// Fetch stocks by barcode
const fetchStockByBarcode = async (barcode='') => {
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

export {
  fetchStockByBarcode,
}
