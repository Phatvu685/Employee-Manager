const departmentService = require('../services/departmentService');

async function getDepartments(req, res) {
    try {
        const departments = await departmentService.fetchDepartments();
        res.json({ success: true, data: departments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getDepartment(req, res) {
    try {
        const department = await departmentService.fetchDepartmentById(req.params.departmentId);
        res.json({ success: true, data: department });
    } catch (error) {
        const status = error.message === 'Department not found' ? 404 : 500;
        res.status(status).json({ success: false, message: error.message });
    }
}

async function addDepartment(req, res) {
    try {
        await departmentService.createDepartment(req.body);
        res.status(201).json({ success: true, message: 'Department added successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function updateDepartment(req, res) {
    try {
        await departmentService.editDepartment(req.params.departmentId, req.body);
        res.json({ success: true, message: 'Department updated successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function deleteDepartment(req, res) {
    try {
        await departmentService.removeDepartment(req.params.departmentId);
        res.json({ success: true, message: 'Department deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = { getDepartments, getDepartment, addDepartment, updateDepartment, deleteDepartment };