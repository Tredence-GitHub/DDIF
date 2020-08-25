module.exports = function(sequelize, Sequelize) {
    return sequelize.define('Connections', {
        row_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_id: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING
        },
        connection_name:{
            type: Sequelize.STRING
        },
        default: {
            type: Sequelize.INTEGER
        },
        format: {
            type: Sequelize.STRING
        },
        hostname: {
            type: Sequelize.STRING
        },
        account_name: {
            type: Sequelize.STRING
        },
        account_key: {
            type: Sequelize.STRING
        },
        source_query:{
            type: Sequelize.STRING
        },
        location_name: {
            type: Sequelize.STRING
        },
        delimiter: {
            type: Sequelize.STRING
        },
        path: {
            type: Sequelize.STRING
        },
        file_type: {
            type: Sequelize.STRING
        },
        port: {
            type: Sequelize.STRING
        }
    },{
            freezeTableName: true,
            timestamps: false,
            underscored: true,
            tableName: 'connection_strings'
    })
}