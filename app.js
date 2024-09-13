const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const noteRoutes = require('./src/routes/noteRoutes');
const handleErrors = require("./src/middlewares/handleErrors");
const logErrors = require("./src/middlewares/logErrors");
const initializeDatabase = require("./src/configs/database");
const bodyParser = require('body-parser');
const { authRateLimiter, notesRateLimiter } = require('./src/middlewares/rateLimiters');

const app = express();
app.use(bodyParser.json());
app.use(cors(
  {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
))

initializeDatabase()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Failed to connect to Database:', err));

app.use('/api/users', authRateLimiter, userRoutes);
app.use('/api/users/', notesRateLimiter, noteRoutes);

app.use(logErrors);
app.use(handleErrors);

const PORT = process.env.PORT || 3000;
app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on port ${PORT}`);
});