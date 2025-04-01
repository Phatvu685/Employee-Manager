const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticateToken, requireManager } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, departmentController.getDepartments);
router.get('/:departmentId', authenticateToken, departmentController.getDepartment);
router.post('/', authenticateToken, requireManager, departmentController.addDepartment);
router.put('/:departmentId', authenticateToken, requireManager, departmentController.updateDepartment);
router.delete('/:departmentId', authenticateToken, requireManager, departmentController.deleteDepartment);

module.exports = router;