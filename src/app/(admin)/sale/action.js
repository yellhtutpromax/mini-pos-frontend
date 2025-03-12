'use server'
import mysqlDb from "@/app/lib/database/mysql"
import {generateUniqueString} from "@/app/utils/generator";

// Fetch stocks by barcode
const fetchStockByBarcode = async () => {
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
    console.log('Error fetching data:', error)
    return {
      success: false,
      message: error.message || 'Error fetching data.',
      error,
    }
  }
}

const saveReceipt = async (formData) => {
  try {
    // Extract data from formData
    const { mutantObject, selectedIds, depositAmount, discountAmount, totalPrice, paymentMethod, userId, notes } = formData;

    const saleIds = [];

    // Loop through mutantObject to insert sales records
    for (const sale of mutantObject) {
      const insertSaleQuery = `
        INSERT INTO sales (
          voucher_codes, stock_id, user_id, unit_price, total_amount, quantity, sell_date, notes, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;

      // Execute the insert query for each sale
      const [saleResult] = await mysqlDb.execute(insertSaleQuery, [
        await generateUniqueString(), // voucher_codes (replace with actual data if needed)
        sale.id, // stock_id (assuming sale.id is the stock_id)
        userId,
        sale.amount, // unit_price
        sale.amount * sale.quantity, // total_amount
        sale.quantity, // quantity
        new Date().toISOString().split('T')[0], // sell_date (today's date)
        '', // notes (optional) note for specific sale item
      ]);

      // Store the newly inserted sale ID
      saleIds.push(saleResult.insertId);
    }

    const insertReceiptQuery = `
      INSERT INTO receipts (
        receipt_code, sale_ids, user_id, payment_id, deposit, discount, total_amount, final_amount, notes, sell_date, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    // Insert the receipt into the receipts table
    const [receiptResult] = await mysqlDb.execute(insertReceiptQuery, [
      await generateUniqueString(),
      saleIds.join(','), // Convert array to comma-separated string
      userId,
      paymentMethod,
      depositAmount,
      discountAmount,
      totalPrice,
      totalPrice - discountAmount,
      notes, // Add notes if needed
      new Date().toISOString().split('T')[0],
    ]);
    return {
      success: true,
      message: 'Receipt saved successfully.',
      data: null, // The data fetched from the table
    }
  }catch (error) {
  // Handle and log errors
    return {
      success: false,
      message: error.message || 'Internal server error occurred while saving the data',
      error,
    }
  }
}

export {
  fetchStockByBarcode,
  saveReceipt
}
