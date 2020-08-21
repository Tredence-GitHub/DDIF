module.exports = function (sequelize, Sequelize) {
    return sequelize.define('Users', {
        username: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        status: {
            type:  Sequelize.INTEGER
        },
        role: {
            type: Sequelize.STRING
        },
        key: {
            type: Sequelize.STRING
        }
    }, {
            freezeTableName: true,
            timestamps: false,
            underscored: true,
            tableName: 'userdetails'
        }
    )
}