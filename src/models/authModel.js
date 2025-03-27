const { connection } = require('../../config/db');
const bcrypt = require('bcryptjs');

async function getAdminByUsername(username) {
    const conn = await connection();
    try {
        const [rows] = await conn.execute('SELECT * FROM admins WHERE username = ?', [username]);
        return rows[0];
    } finally {
        await conn.end();
    }
}

async function createAdmin(username, password) {
    const conn = await connection();
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await conn.execute('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashedPassword]);
    } finally {
        await conn.end();
    }
}

module.exports = { getAdminByUsername, createAdmin };