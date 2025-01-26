'use server'
import mysqlDb from "@/app/lib/database/mysql";

const saveFormData = async (formData) => {
  try {
    // Prepare the SQL query
    const sql = `INSERT INTO stocks (name, buy_amount, sell_amount, quantity, created_at, updated_at)
                 VALUES (?, ?, ?, ?, NOW(), NOW())`;

    // Execute the query with formData
    const [result] = await mysqlDb.execute(sql, [
      formData.name,
      formData.buyAmount,
      formData.sellAmount,
      formData.quantity,
    ]);

    // console.log('Data saved successfully:', result);
    return { success: true, message: 'Data saved successfully.', result };
  } catch (error) {
    // console.error('Error saving data:', error);
    // Return a structured error response
    return { success: false, message: error.message || 'Error saving data.', error: error };
  }
};

export { saveFormData };
