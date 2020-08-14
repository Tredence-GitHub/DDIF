const Sequelize = require('sequelize');
const sequelize = new Sequelize('deaccelator', 'DEadmin@demetadata', 'Tredence@123', {
    host: "demetadata.mysql.database.azure.com",
    dialect: 'mysql',
    // driver: 'tedious',
    pool: {
        max: 10,
        min: 5,
        idle: 10000,
    },
    port: 3306,
    define: {
        timestamps: false
    },
    dialectOptions: {
        options: {
            encrypt: true,
            "requestTimeout": 300000
        }
    }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Op = Sequelize.Op;
db.Users = require('../models/userDb.js')(sequelize, Sequelize);

module.exports = db;

