module.exports = function (sequelize, Sequelize){
    return sequelize.define('BusinessRules', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        entry_id: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        column_name: {
            primaryKey: true,
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        rule_name: {
            type: Sequelize.STRING
        },
        rule_parameters: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        tableName: 'business_rule_metadata'
    })
}