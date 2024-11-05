const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT;
db();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const preferencesRoutes = require('./routes/preferencesRoutes');

app.use('/users', userRoutes);

app.use(authMiddleware);
app.use('/preferences', preferencesRoutes);
app.use('/recipes', recipeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});