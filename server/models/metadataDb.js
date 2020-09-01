module.exports = function(sequelize, Sequelize){
    return sequelize.define('Metadata', {
        row_id:{
            type: Sequelize.INTEGER,
            PrimaryKey: true
        },
        entry_id: {
            type: Sequelize.INTEGER
        },
        column_id: {
            type: Sequelize.INTEGER
        },
        column_name: {
            type: Sequelize.STRING
        },
        data_type: {
            type: Sequelize.STRING
        },
        primary_key:{
            type: Sequelize.STRING
        },
        Nullable: {
            type: Sequelize.STRING
        },
        dqcheck: {
            type: Sequelize.STRING
        },
        default: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        pii: {
            type: Sequelize.STRING
        },
        pii_type: {
            type: Sequelize.STRING
        },
        format: {
            type: Sequelize.STRING
        }
    }, {
            freezeTableName: true,
            underscored: true,
            timestamps: false,
            tableName: 'metadata_master'
    })
}
