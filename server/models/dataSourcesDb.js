module.exports = function(sequelize, Sequelize){
    return sequelize.define('DataSources', {
        typeId: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        source_type: {
            type: Sequelize.STRING
        },
        abbrv: {
            type: Sequelize.STRING
        }
    }, {
            freezeTableName: true,
            timestamps: false,
            underscored: true,
            tableName: 'data_sources'
    })
}