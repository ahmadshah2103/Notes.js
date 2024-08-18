const db = require("../models");

const initializeDatabase = async () => {
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
}

module.exports = initializeDatabase;