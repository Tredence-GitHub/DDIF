module.exports = function(sequelize, Sequelize){
    return sequelize.define('Schedule',{
        job_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        jobname: {
            type: Sequelize.STRING
        },
        schedule_type: {
            type: Sequelize.STRING
        },
        recurrence: {
            type: Sequelize.INTEGER
        },
        recurrence_type: {
            type: Sequelize.STRING
        },
        days: {
            type: Sequelize.STRING
        },
        start_time: {
            type: 'TIMESTAMP'
        },
        start_date: {
            type: 'TIMESTAMP'
        },
        end_date: {
            type: 'TIMESTAMP'
        }

    }, {
            freezeTableName: true,
            timestamps: false,
            underscored: true,
            tableName: 'schedule_master'
    })
}