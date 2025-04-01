const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { authenticateToken, requireManager } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, employeeController.getEmployees);
router.get('/:employeeId', authenticateToken, employeeController.getEmployee);
router.post('/', authenticateToken, requireManager, employeeController.addEmployee);
router.put('/:employeeId', authenticateToken, requireManager, employeeController.updateEmployee);
router.delete('/:employeeId', authenticateToken, requireManager, employeeController.deleteEmployee);

module.exports = router;