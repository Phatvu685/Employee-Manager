const authModel = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function register(username, password, role) {
    const admin = await authModel.getAdminByUsername(username);
    if (admin) {
        throw new Error('Username already exists');
    }
    if (role && !['Manager', 'Employee'].includes(role)) {
        throw new Error('Invalid role');
    }
    const adminId = await authModel.createAdmin(username, password, role);
    return adminId;
}

async function login(username, password) {
    const admin = await authModel.getAdminByUsername(username);
    if (!admin) {
        throw new Error('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new Error('Invalid username or password');
    }
    const token = jwt.sign(
        { id: admin.id, username: admin.username, role: admin.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
    return token;
}

module.exports = { register, login };