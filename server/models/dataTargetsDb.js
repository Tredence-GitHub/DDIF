module.exports = function(sequelize, Sequelize){
    return sequelize.define('DataTargets', {
        typeId: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        target_type: {
            type: Sequelize.STRING
        },
        abbrv: {
            type: Sequelize.STRING
        }
    }, {
            freezeTableName: true,
            timestamps: false,
            underscored: true,
            tableName: 'data_targets'
    })
}