const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

console.log('DB Config:', dbConfig);

async function connection() {
    try {
        const conn = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL database successfully');
        return conn;
    } catch (error) {
        console.error('MySQL Connection Error:', error.message);
        throw error;
    }
}

module.exports = { connection };