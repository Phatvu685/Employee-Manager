const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, departmentController.getDepartments);
router.get('/:departmentId', authenticateToken, departmentController.getDepartment);
router.post('/', authenticateToken, departmentController.addDepartment);
router.put('/:departmentId', authenticateToken, departmentController.updateDepartment);
router.delete('/:departmentId', authenticateToken, departmentController.deleteDepartment);

module.exports = router;