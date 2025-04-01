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
        const { employeeId } = req.params;
        const employee = await employeeService.fetchEmployeeById(employeeId);
        res.json({ success: true, data: employee });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}

async function addEmployee(req, res) {
    try {
        const employee = req.body;
        const employeeId = await employeeService.createEmployee(employee);
        res.status(201).json({ success: true, message: 'Employee added successfully', employeeId });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function updateEmployee(req, res) {
    try {
        const { employeeId } = req.params;
        const employee = req.body;
        await employeeService.editEmployee(employeeId, employee);
        res.json({ success: true, message: 'Employee updated successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function deleteEmployee(req, res) {
    try {
        const { employeeId } = req.params;
        await employeeService.removeEmployee(employeeId);
        res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = { getEmployees, getEmployee, addEmployee, updateEmployee, deleteEmployee };