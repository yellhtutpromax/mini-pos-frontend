"use server"
import mysqlDb from "@/app/lib/database/mysql"

const fetchReceipts = async () => {
  try {
    // SQL query to fetch receipts along with sales and stock data
    const sql = `
        SELECT
            r.id AS receipt_id,
            r.receipt_code,
            r.sale_ids,
            r.user_id,
            r.payment_id,
            r.deposit,
            r.discount,
            r.total_amount,
            r.final_amount,
            r.notes,
            r.sell_date,
            r.created_at,
            r.updated_at,
            s.id AS sale_id,
            s.voucher_codes,
            s.stock_id,
            s.unit_price,
            s.quantity,
            s.total_amount AS sale_total,
            s.sell_date AS sale_date,
            s.notes AS sale_notes,
            s.created_at AS sale_created_at,
            s.updated_at AS sale_updated_at,
            st.name AS stock_name,
            st.barcode AS stock_barcode,
            st.buy_amount AS stock_buy_price,
            st.sell_amount AS stock_sell_price,
            st.photo AS stock_photo,
            st.quantity AS stock_quantity
        FROM receipts r
                 LEFT JOIN sales s ON FIND_IN_SET(s.id, r.sale_ids) > 0
                 LEFT JOIN stocks st ON s.stock_id = st.id
        ORDER BY r.id DESC;
    `;

    // Execute the query
    const [rows] = await mysqlDb.execute(sql);

    // Transform data to group sales under respective receipts
    const receiptsMap = {};
    rows.forEach(row => {
      if (!receiptsMap[row.receipt_id]) {
        receiptsMap[row.receipt_id] = {
          receipt_id: row.receipt_id,
          receipt_code: row.receipt_code,
          sale_ids: row.sale_ids,
          user_id: row.user_id,
          payment_id: row.payment_id,
          deposit: row.deposit,
          discount: row.discount,
          total_amount: row.total_amount,
          final_amount: row.final_amount,
          notes: row.notes,
          sell_date: row.sell_date,
          created_at: row.created_at,
          updated_at: row.updated_at,
          sales: []
        };
      }

      if (row.sale_id) {
        receiptsMap[row.receipt_id].sales.push({
          sale_id: row.sale_id,
          voucher_codes: row.voucher_codes,
          stock_id: row.stock_id,
          unit_price: row.unit_price,
          quantity: row.quantity,
          total_amount: row.sale_total,
          sell_date: row.sale_date,
          sale_notes: row.sale_notes,
          created_at: row.sale_created_at,
          updated_at: row.sale_updated_at,
          stock: {
            name: row.stock_name,
            barcode: row.stock_barcode,
            buy_price: row.stock_buy_price,
            sell_price: row.stock_sell_price,
            photo: row.stock_photo,
            stock_quantity: row.stock_quantity
          }
        });
      }
    });

    return {
      success: true,
      message: 'Receipts fetched successfully.',
      data: Object.values(receiptsMap),
    };
  } catch (error) {
    console.error('Error fetching receipts:', error);
    return {
      success: false,
      message: error.message || 'Error fetching receipts.',
      error,
    };
  }
};

export {
  fetchReceipts
};
