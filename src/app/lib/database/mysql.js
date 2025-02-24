import mysql from 'mysql2/promise';

const mysqlDb = mysql.createPool({
  host: process.env.NEXT_DATABASE_HOST || 'localhost',
  database: process.env.NEXT_DATABASE_NAME || 'mini_pos',
  user: process.env.NEXT_DATABASE_USERNAME || 'root',
  password: process.env.NEXT_DATABASE_PASSWORD || '',
});

export default mysqlDb;