"use server"
import mysqlDb from "@/app/lib/database/mysql"

const fetchSaleData = async () => {
  try {
    // Fetch all sale data, including related stock and user details
    const sql = `
        SELECT
            s.id,
            s.voucher_codes,
            s.unit_price,
            s.total_amount,
            s.quantity,
            s.sell_date,
            s.notes,
            s.created_at,
            s.updated_at,
            st.id AS stock_id,
            st.name AS stock_name,
            st.barcode,
            st.buy_amount,
            st.sell_amount,
            st.quantity AS stock_quantity,
            st.created_at AS stock_created_at,
            st.updated_at AS stock_updated_at,
            u.id AS user_id,
            u.name AS user_name,
            u.email AS user_email
        FROM sales s
                 JOIN stocks st ON s.stock_id = st.id
                 JOIN users u ON s.user_id = u.id
        ORDER BY s.id DESC
    `

    // Execute the query to get all sale records
    const [rows] = await mysqlDb.execute(sql)

    if (rows.length === 0) {
      return {
        success: false,
        message: 'No data found.',
        data: null,
      }
    }

    // Map the rows to return an array of structured sale data
    const sales = rows.map(sale => ({
      id: sale.id,
      voucher_codes: sale.voucher_codes,
      unit_price: sale.unit_price,
      total_amount: sale.total_amount,
      quantity: sale.quantity,
      sell_date: sale.sell_date,
      notes: sale.notes,
      created_at: sale.created_at,
      updated_at: sale.updated_at,
      stock: {
        id: sale.stock_id,
        name: sale.stock_name,
        barcode: sale.barcode,
        buy_amount: sale.buy_amount,
        sell_amount: sale.sell_amount,
        quantity: sale.stock_quantity,
        created_at: sale.stock_created_at,
        updated_at: sale.stock_updated_at,
      },
      user: {
        id: sale.user_id,
        name: sale.user_name,
        email: sale.user_email,
      },
    }))

    // Return structured GraphQL-like response
    return {
      success: true,
      message: 'Data fetched successfully.',
      data: sales,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Error fetching data.',
      error,
    }
  }
}

export {
  fetchSaleData
}
