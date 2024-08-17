const express = require('express');
const app = express();
const db = require('./src/models');

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

app.get('/', (req, res) => {
    res.send('Hello World on port 3000!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});