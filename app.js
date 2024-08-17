const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./src/routes/user')
const db = require('./src/models');

app.use(express.json());
app.use(cors())

db.sequelize.authenticate()
    .then(() => {
        console.log('Database connected and authenticated');
        return db.sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});