const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_database,
    process.env.DB_username,
    process.env.DB_password, {
        host: process.env.DB_host,
        dialect: "mysql"
    }
);

module.exports = sequelize;