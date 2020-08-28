module.exports = function (sequelize, Sequelize){
    return sequelize.define('BusinessRules', {
        entry_id: {
            type: Sequelize.INTEGER
        },
        column_name: {
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