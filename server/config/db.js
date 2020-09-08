const Sequelize = require('sequelize');
const sequelize = new Sequelize('deaccelator', 'DEadmin@ddifmetadata', 'Tredence@123', {
    host: "ddifmetadata.mysql.database.azure.com",
    dialect: 'mysql',
    ssl: true,
    // driver: 'tedious',
    pool: {
        max: 10,
        min: 5,
        idle: 10000,
    },
    port: 3306,
    define: {
        timestamps: false
    },
    dialectOptions: {
        options: {
            encrypt: true,
            "requestTimeout": 300000
        }
    }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Op = Sequelize.Op;
db.Users = require('../models/userDb.js')(sequelize, Sequelize);
db.Audit = require('../models/audittableDb.js')(sequelize, Sequelize);
db.ProjectTypes = require('../models/projecttypesDb.js')(sequelize, Sequelize);
db.DataCatalog = require('../models/dataCatalogDb.js')(sequelize, Sequelize);
db.DataSources = require('../models/dataSourcesDb.js')(sequelize, Sequelize);
db.Announcements = require('../models/announcementsDb.js')(sequelize, Sequelize);
db.Parameters = require('../models/parametersDb.js')(sequelize, Sequelize);
db.DataTargets = require('../models/dataTargetsDb.js')(sequelize, Sequelize);
db.Schedule = require('../models/scheduleJobDb.js')(sequelize, Sequelize);
db.Connections = require('../models/connectionStringsDb.js')(sequelize, Sequelize);
db.Metadata = require('../models/metadataDb.js')(sequelize, Sequelize);
db.BusinessRules = require('../models/businessrulesDb.js')(sequelize, Sequelize);
db.CustomRules = require('../models/customrulesDb.js')(sequelize, Sequelize);
db.CentralRules = require('../models/centralruleRepoDb.js')(sequelize, Sequelize);

db.Announcements.belongsTo(db.DataCatalog, {foreignKey: 'entry_id'});
db.DataCatalog.belongsTo(db.Schedule, {foreignKey: 'entryId'});
db.DataCatalog.belongsTo(db.Parameters, {foreignKey: 'entryId'});
db.DataCatalog.belongsTo(db.CustomRules, {foreignKey: 'entry_id'});


module.exports = db;

