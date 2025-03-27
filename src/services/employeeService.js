const employeeModel = require('../models/employeeModel');
const departmentModel = require('../models/departmentModel');

async function fetchEmployees() {
    const employees = await employeeModel.getAllEmployees();
    return employees;
}

async function fetchEmployeeById(employeeId) {
    const employee = await employeeModel.getEmployeeById(employeeId);
    if (!employee) {
        throw new Error('Employee not found');
    }
    return employee;
}

async function createEmployee(employee) {
    if (!employee.employeeId || !employee.fullName || !employee.departmentId) {
        throw new Error('Missing required fields');
    }
    const department = await departmentModel.getDepartmentById(employee.departmentId);
    if (!department) {
        throw new Error('Department not found');
    }
    await employeeModel.addEmployee(employee);
}

async function editEmployee(employeeId, employee) {
    const existingEmployee = await employeeModel.getEmployeeById(employeeId);
    if (!existingEmployee) {
        throw new Error('Employee not found');
    }
    if (employee.departmentId) {
        const department = await departmentModel.getDepartmentById(employee.departmentId);
        if (!department) {
            throw new Error('Department not found');
        }
    }
    await employeeModel.updateEmployee(employeeId, employee);
}

async function removeEmployee(employeeId) {
    const existingEmployee = await employeeModel.getEmployeeById(employeeId);
    if (!existingEmployee) {
        throw new Error('Employee not found');
    }
    await employeeModel.deleteEmployee(employeeId);
}

module.exports = { fetchEmployees, fetchEmployeeById, createEmployee, editEmployee, removeEmployee };