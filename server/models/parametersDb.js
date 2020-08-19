module.exports = function(sequelize, Sequelize){
    return sequelize.define('Parameters', {
        entryId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        SourceType: {
            type: Sequelize.INTEGER
        },
        SourceParameter: {
            type: Sequelize.TEXT
        },
        SourceQuery: {
            type: Sequelize.TEXT
        },
        TargetType: {
            type: Sequelize.INTEGER
        },
        TargetParameter: {
            type: Sequelize.TEXT
        },
        TargetFileType: {
            type: Sequelize.TEXT
        },
        TargetFileDelimiter: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        tableName: 'parameters'
    })
}