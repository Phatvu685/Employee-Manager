const authService = require('../services/authService');

async function register(req, res) {
    try {
        const { username, password, role } = req.body;
        const adminId = await authService.register(username, password, role);
        res.status(201).json({ success: true, message: 'Admin registered successfully', adminId });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        res.json({ success: true, token });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}

module.exports = { register, login };