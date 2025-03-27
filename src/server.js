const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});