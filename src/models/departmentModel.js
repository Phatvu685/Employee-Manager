const { connection } = require('../../config/db');

async function getAllDepartments() {
    const conn = await connection();
    try {
        const [rows] = await conn.execute('SELECT * FROM departments');
        return rows;
    } finally {
        await conn.end();
    }
}

async function getDepartmentById(departmentId) {
    const conn = await connection();
    try {
        const [rows] = await conn.execute('SELECT * FROM departments WHERE departmentId = ?', [departmentId]);
        return rows[0];
    } finally {
        await conn.end();
    }
}

async function addDepartment(department) {
    const conn = await connection();
    try {
        const { departmentName } = department;
        const [result] = await conn.execute('INSERT INTO departments (departmentName) VALUES (?)', 
            [departmentName]);
        return result.insertId; // Trả về ID được tự động sinh
    } finally {
        await conn.end();
    }
}

async function updateDepartment(departmentId, department) {
    const conn = await connection();
    try {
        const { departmentName } = department;
        await conn.execute('UPDATE departments SET departmentName = ? WHERE departmentId = ?', 
            [departmentName, departmentId]);
    } finally {
        await conn.end();
    }
}

async function deleteDepartment(departmentId) {
    const conn = await connection();
    try {
        await conn.execute('DELETE FROM departments WHERE departmentId = ?', [departmentId]);
    } finally {
        await conn.end();
    }
}

module.exports = { getAllDepartments, getDepartmentById, addDepartment, updateDepartment, deleteDepartment };