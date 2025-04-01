const { connection } = require('../../config/db');
const bcrypt = require('bcryptjs');

async function getAdminByUsername(username) {
    const conn = await connection();
    try {
        const [rows] = await conn.execute('SELECT id, username, password, role FROM admins WHERE username = ?', [username]);
        return rows[0];
    } finally {
        await conn.end();
    }
}

async function createAdmin(username, password, role = 'Employee') {
    const conn = await connection();
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await conn.execute('INSERT INTO admins (username, password, role) VALUES (?, ?, ?)', 
            [username, hashedPassword, role]);
        return result.insertId; 
    } finally {
        await conn.end();
    }
}

module.exports = { getAdminByUsername, createAdmin };