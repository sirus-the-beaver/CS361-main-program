const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
db();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});