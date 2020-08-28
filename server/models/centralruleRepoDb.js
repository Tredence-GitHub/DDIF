module.exports = function(sequelize, Sequelize){
    return sequelize.define('CentralRules', {
        name: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        user_name: {
            type: Sequelize.STRING
        },
        definition: {
            type: Sequelize.STRING
        },
        creator: {
            type: Sequelize.STRING
        },
        approver: {
            type: Sequelize.STRING
        },
        created_date: {
            type: 'TIMESTAMP'
        },
        last_modified: {
            type: 'TIMESTAMP'
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        tableName: 'centralrulerepo'
    })
}