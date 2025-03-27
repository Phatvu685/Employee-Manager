const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, employeeController.getEmployees);
router.get('/:employeeId', authenticateToken, employeeController.getEmployee);
router.post('/', authenticateToken, employeeController.addEmployee);
router.put('/:employeeId', authenticateToken, employeeController.updateEmployee);
router.delete('/:employeeId', authenticateToken, employeeController.deleteEmployee);

module.exports = router;