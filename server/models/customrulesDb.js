module.exports = function (sequelize, Sequelize){
    return sequelize.define('CustomRules', {
        entry_id: {
            type: Sequelize.INTEGER
        },
        custom_rulename: {
            type: Sequelize.STRING
        },
        rule_definition: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        tableName: 'custom_rule_metadata'
    })
}