module.exports = function(sequelize, Sequelize) {
    return sequelize.define('DataCatalog', {
        entryId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        project_type: {
            type: Sequelize.INTEGER
        },
        jobname: {
            type: Sequelize.STRING
        },
        projectname: {
            type: Sequelize.STRING
        },
        created_by: {
            type: Sequelize.STRING
        },
        created_at: {
            type: 'TIMESTAMP'
        },
        source_type: {
            type: Sequelize.INTEGER
        },
        target_type: {
            type: Sequelize.INTEGER
        },
        operation: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING,
            default: 'draft'
        },
        updated_at: {
            type: 'TIMESTAMP'
        },
        updated_by: {
            type: Sequelize.STRING
        },
        status_changed_at: {
            type: 'TIMESTAMP'
        }
    }, {
            freezeTableName: true,
            underscored: true,
            timestamps: false,
            tableName: 'data_catalog'
    })
}
