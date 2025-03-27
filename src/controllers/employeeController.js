const employeeService = require('../services/employeeService');

async function getEmployees(req, res) {
    try {
        const employees = await employeeService.fetchEmployees();
        res.json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getEmployee(req, res) {
    try {
        const employee = await employeeService.fetchEmployeeById(req.params.employeeId);
        res.json({ success: true, data: employee });
    } catch (error) {
        const status = error.message === 'Employee not found' ? 404 : 500;
        res.status(status).json({ success: false, message: error.message });
    }
}

async function addEmployee(req, res) {
    try {
        await employeeService.createEmployee(req.body);
        res.status(201).json({ success: true, message: 'Employee added successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function updateEmployee(req, res) {
    try {
        await employeeService.editEmployee(req.params.employeeId, req.body);
        res.json({ success: true, message: 'Employee updated successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function deleteEmployee(req, res) {
    try {
        await employeeService.removeEmployee(req.params.employeeId);
        res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = { getEmployees, getEmployee, addEmployee, updateEmployee, deleteEmployee };