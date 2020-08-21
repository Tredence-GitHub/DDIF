module.exports = function(sequelize, Sequelize){
    return sequelize.define('ProjectTypes', {
        typeId: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        project_type: {
            type: Sequelize.STRING
        }
    }, {
            freezeTableName: true,
            timestamps: false,
            underscored: true,
            tableName: 'project_types'
    })
}