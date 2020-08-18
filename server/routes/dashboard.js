const db = require('../config/db.js');
const express = require('express');
const Router = express.Router();

Router.get('/dashboardInformation', (req, res)=>{
    let dashboardData = {};

    db.Audit.findAll({
        attributes: [
            [db.sequelize.fn('COUNT', db.sequelize.col('JobName')), 'total_jobs']        
        ]
    }).then((result)=>{
        dashboardData['total_jobs'] = result[0].dataValues.total_jobs;
        console.log(dashboardData, " ---1---");
        db.Users.findAll({
            attributes: [
                [db.sequelize.fn('COUNT', db.sequelize.col('username')), 'total_users']
            ]
        }).then((result2)=>{
            dashboardData['total_users'] = result2[0].dataValues.total_users;

            const total_projecttypes = new Promise((resolve, reject)=>{
            db.ProjectTypes.findAll({
                attributes: [
                    [db.sequelize.fn('COUNT', db.sequelize.col('type_id')), 'total_projecttypes']
                ]
            }).then((result3)=>{
            resolve(result3[0].dataValues.total_projecttypes);
            }).catch((err)=>{
                reject(err);
            })
        });

        const total_datasets = new Promise((resolve, reject)=>{
            db.sequelize.query(`SELECT COUNT(EntryId) as total_datasets FROM parameter`)
            .then((result4)=>{
                console.log(Object.keys(result4[0]))
                resolve(result4[0][0].total_datasets);
            }).catch((err)=>{
                console.log(err, "==== ! ===")
                reject(err);
            });
        });

        const total_datasources = new Promise((resolve, reject)=>{
            db.ProjectTypes.findAll({
                attributes: [
                    [db.sequelize.fn('COUNT', db.sequelize.col('type_id')), 'total_datasources']
                ]
            })
            .then((result4)=>{
                resolve(result4[0].dataValues.total_datasources);
            }).catch((err)=>{
                console.log(err, "==== ! ===")
                reject(err);

            })
        });



        Promise.all([total_projecttypes, total_datasets, total_datasources]).then((finalResult)=>{
            console.log(finalResult);
            dashboardData['total_projecttypes'] = finalResult[0];
            dashboardData['total_datasets'] = finalResult[1];
            dashboardData['total_datasources'] = finalResult[2];
            
            res.status(200).json({message: 'Successful', data: JSON.parse(JSON.stringify(dashboardData))});
        }).catch((err2)=>{
            console.log(err2, "***");
            res.status(400).json({message: 'failed', error: [err2], data: []})
        })
                

        }).catch((err2)=>{
            console.log(err2, "@**@");
            res.status(400).json({message: 'failed', error: [err2], data: []})
        })
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({message: 'failed', error: [err], data: []})
    })
});

Router.post('/getActivityLogs', (req, res)=>{
    db.DataCatalog.findAll({
        attributes: ['jobname', 'status','created_at'],
        order: ['created_at']
    }).then((result)=>{
        res.status(200).json({ message: 'successful', data: JSON.parse(JSON.stringify(result
            ))});

    }).catch((err)=>{
        console.log(err);
        res.status(400).json({message: 'failed', error: [err], data: []})
    })
})

module.exports = Router;