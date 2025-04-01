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
        const { departmentId } = req.params;
        const department = await departmentService.fetchDepartmentById(departmentId);
        res.json({ success: true, data: department });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}

async function addDepartment(req, res) {
    try {
        const department = req.body;
        const departmentId = await departmentService.createDepartment(department);
        res.status(201).json({ success: true, message: 'Department added successfully', departmentId });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function updateDepartment(req, res) {
    try {
        const { departmentId } = req.params;
        const department = req.body;
        await departmentService.editDepartment(departmentId, department);
        res.json({ success: true, message: 'Department updated successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function deleteDepartment(req, res) {
    try {
        const { departmentId } = req.params;
        await departmentService.removeDepartment(departmentId);
        res.json({ success: true, message: 'Department deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = { getDepartments, getDepartment, addDepartment, updateDepartment, deleteDepartment };