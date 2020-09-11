module.exports = function(sequelize, Sequelize) {
    return sequelize.define('Audit', {
        entryId: {
            type: Sequelize.INTEGER,
            field: 'EntryID',
            primaryKey: true,
            allowNull: false,
        },
        jobname: {
            type: Sequelize.STRING,
            field: 'JobName'
        },
        projectname: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'JobTitle'
        },
        start_time: {
            type: 'TIMESTAMP',
            field: 'StartTime'
        },
        end_time: {
            type: 'TIMESTAMP',
            field: 'EndTime'
        },
        username: {
            type: Sequelize.STRING,
            field: 'UserName'
        },
        total_rows: {
            type: Sequelize.INTEGER,
            field: 'TotalRows'
        },
        ingested_rows: {
            type: Sequelize.INTEGER,
            field: 'IngestedRows'
        },
        duplicated_records: {
            type: Sequelize.INTEGER,
            field: 'DuplicateRecords'
        },
        dq_check_failed: {
            type: Sequelize.INTEGER,
            field: 'DQCheckFailed'
        },
        br_check_failed: {
            type: Sequelize.INTEGER,
            field: 'BRCheckFailed'
        },
        cr_check_failed: {
            type: Sequelize.INTEGER,
            field: 'CRCheckFailed'
        },
        rejected_rows: {
            type: Sequelize.INTEGER,
            field: 'RejectedRows'
        },
        status: {
            type: Sequelize.STRING,
            field:'Status'
        },
        relative_file_path: {
            type: Sequelize.TEXT,
            field: 'RelativeFilePath'
        }

    }, {
        
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        tableName: 'audittable'
    }
    )
}
