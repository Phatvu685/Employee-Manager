const departmentModel = require('../models/departmentModel');

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
    if (!department.departmentName) {
        throw new Error('Missing required fields');
    }
    return await departmentModel.addDepartment(department);
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
    await departmentModel.deleteDepartment(departmentId);
}

module.exports = { fetchDepartments, fetchDepartmentById, createDepartment, editDepartment, removeDepartment };