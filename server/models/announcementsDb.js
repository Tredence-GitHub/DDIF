module.exports = function(sequelize, Sequelize){
    return sequelize.define('Annonuncements',{
        announcement_id:  {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        entry_id: {
            type: Sequelize.INTEGER
        },
        entry_status: {
            type: Sequelize.STRING
        },
        created_at:{
            type: 'TIMESTAMP'
        },
        recent: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        underscored: true,
        timestamps: false,
        tableName: 'Announcements'
    })
}