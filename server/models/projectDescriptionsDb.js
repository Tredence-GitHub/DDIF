module.exports = function(sequelize, Sequelize){
    return sequelize.define('BusinessFunctions', {
        row_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        project_type: {
            type: Sequelize.INTEGER
        },
        project_name: {
            type: Sequelize.STRING
        },
        description: {
            type: 'TEXT'
        },
        owner: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        tableName: 'business_functions'
    })
}