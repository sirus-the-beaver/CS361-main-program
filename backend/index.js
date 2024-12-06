const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT;
db();

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
// const notesRoutes = require('./routes/notesRoutes');

app.use('/users', userRoutes);

app.use('/recipes', authMiddleware, recipeRoutes);
// app.use('/notes', notesRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});