const { connection } = require('../../config/db');

async function getAllEmployees() {
    const conn = await connection();
    try {
        const [rows] = await conn.execute('SELECT * FROM employees');
        return rows;
    } finally {
        await conn.end();
    }
}

async function getEmployeeById(employeeId) {
    const conn = await connection();
    try {
        const [rows] = await conn.execute('SELECT * FROM employees WHERE employeeId = ?', [employeeId]);
        return rows[0];
    } finally {
        await conn.end();
    }
}

async function addEmployee(employee) {
    const conn = await connection();
    try {
        const { employeeId, fullName, birthDate, departmentId } = employee;
        await conn.execute(
            'INSERT INTO employees (employeeId, fullName, birthDate, departmentId) VALUES (?, ?, ?, ?)',
            [employeeId, fullName, birthDate, departmentId]
        );
    } finally {
        await conn.end();
    }
}

async function updateEmployee(employeeId, employee) {
    const conn = await connection();
    try {
        const { fullName, birthDate, departmentId } = employee;
        await conn.execute(
            'UPDATE employees SET fullName = ?, birthDate = ?, departmentId = ? WHERE employeeId = ?',
            [fullName, birthDate, departmentId, employeeId]
        );
    } finally {
        await conn.end();
    }
}

async function deleteEmployee(employeeId) {
    const conn = await connection();
    try {
        await conn.execute('DELETE FROM employees WHERE employeeId = ?', [employeeId]);
    } finally {
        await conn.end();
    }
}

module.exports = { getAllEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee };