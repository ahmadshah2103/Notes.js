const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/user');
const handleErrors = require("./src/middlewares/handleErrors");
const initializeDatabase = require("./src/configs/database");

const app = express();
app.use(express.json());
app.use(cors())

initializeDatabase().then(() => console.log('Database running ...'));

app.use('/api/users', userRoutes)
app.use(handleErrors);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});