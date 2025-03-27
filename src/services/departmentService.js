const departmentModel = require('../models/departmentModel');
const employeeModel = require('../models/employeeModel');

async function fetchDepartments() {
    const departments = await departmentModel.getAllDepartments();
    return departments;
}

async function fetchDepartmentById(departmentId) {
    const department = await departmentModel.getDepartmentById(departmentId);
    if (!department) {
        throw new Error('Department not found');
    }
    return department;
}

async function createDepartment(department) {
    if (!department.departmentId || !department.departmentName) {
        throw new Error('Missing required fields');
    }
    await departmentModel.addDepartment(department);
}

async function editDepartment(departmentId, department) {
    const existingDepartment = await departmentModel.getDepartmentById(departmentId);
    if (!existingDepartment) {
        throw new Error('Department not found');
    }
    await departmentModel.updateDepartment(departmentId, department);
}

async function removeDepartment(departmentId) {
    const existingDepartment = await departmentModel.getDepartmentById(departmentId);
    if (!existingDepartment) {
        throw new Error('Department not found');
    }
    const employees = await employeeModel.getAllEmployees();
    const hasEmployees = employees.some(emp => emp.departmentId === departmentId);
    if (hasEmployees) {
        throw new Error('Cannot delete department with employees');
    }
    await departmentModel.deleteDepartment(departmentId);
}

module.exports = { fetchDepartments, fetchDepartmentById, createDepartment, editDepartment, removeDepartment };