const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
db();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

module.exports = app;