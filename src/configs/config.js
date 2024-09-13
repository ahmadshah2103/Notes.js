require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '1admin!+user1',
        database: process.env.DB_NAME || 'notes',
        host: process.env.DB_HOST || 'db',
        port: 3306,
        dialect: 'mysql',
    },
};