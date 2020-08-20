const db = require('../config/db.js');
const express = require('express');
const { resolve } = require('path');
const Router = express.Router();

// get all the information for the data table
Router.post('/getRecords', (req, res)=>{
    db.DataCatalog.findAll()
    .then((result)=>{
        res.status(200).json({message: 'successful', data: JSON.parse(JSON.stringify(result))});
    }).catch((err)=>{
        res.status(400).json({message: 'failed', data: [], error: [err]});
    })
})

// get project types, data source types, data target types
Router.get('/getDropdowns',(req, res)=>{
    let source_types = new Promise((resolve, reject)=>{
        db.DataSources.findAll()
        .then((result)=>{
            resolve(JSON.parse(JSON.stringify(result)));
        }).catch((err)=>{
            reject(err);
        })
    })

    let target_types = new Promise((resolve, reject)=>{
        db.DataTargets.findAll()
        .then((result)=>{
            resolve(JSON.parse(JSON.stringify(result)));
        }).catch((err)=>{
            reject(err);
        })
    })

    let project_types = new Promise((resolve, reject)=>{
        db.ProjectTypes.findAll()
        .then((result)=>{
            resolve(JSON.parse(JSON.stringify(result)));
        }).catch((err)=>{
            reject(err);
        })
    })

    Promise.all([source_types, target_types, project_types])
    .then((response)=>{
        let frameResponse = {}

        frameResponse['data_sources'] = response[0];
        frameResponse['data_targets'] = response[1];
        frameResponse['project_types'] = response[2];

        res.status(200).json({message: 'successful', data: JSON.parse(JSON.stringify(frameResponse)) })
    })
});

// Save form in parameters and data_catalog by creating a job ID and checking if project name is not present previously

Router.post('/setupDataSave', (req, res)=>{
    let request_data = req.body;
    console.log(request_data);
    db.DataCatalog.findAll({
        where: {
            projectname: request_data.projectname
        }
    }).then((result)=>{
        if(result.length > 0){
            res.status(200).json({message: 'The job title is already used! Please use a unique job title', data: []});
        }
        else{
            
            db.DataCatalog.create({
                username: request_data.username,
                rationale: request_data.rationale,
                projectname: request_data.projectname,
                project_type: request_data.project_type,
                jobname: '',
                created_by: request_data.created_by,
                created_at: new Date(),
                source_type: request_data.source_type,
                target_type: request_data.target_type,
                status: request_data.status,
                operation: request_data.operation,
                updated_at: new Date(),
                updated_by: request_data.updated_by,
                status_changed_at: new Date()
            }).then((resultCreated)=>{
                let result = JSON.parse(JSON.stringify(resultCreated));
                console.log(result);
                let jobID = `JOB_${request_data.source_abbrv}_${request_data.target_abbrv}_${result.entryId}`;

                db.DataCatalog.update({
                    jobname: jobID
                },{
                    where: {
                        entryId: result.entryId

                    }
                }).then((updatedRes)=>{
                    db.Parameters.create({
                        entryId: result.entryId,
                        SourceType: request_data.source_type,
                        SourceParameter: JSON.stringify(request_data.source_parameter),
                        SourceQuery: request_data.source_query,
                        TargetType: request_data.target_type,
                        TargetParameter:JSON.stringify(request_data.target_parameter),
                        TargetFileType: request_data.target_file_type,
                        TargetFileDelimiter: request_data.target_file_delimiter

                    }).then((parametersRes)=>{
                     
                        let frameFinal = {};
                        frameFinal['entry_id'] = result.entryId;
                        frameFinal['parameters'] = JSON.parse(JSON.stringify(parametersRes));

                        res.status(200).json({message: 'Successful', data: JSON.parse(JSON.stringify(frameFinal)) });

                    }).catch((err)=>{
                        console.log(err)
                        res.status(400).json({message: 'failed', error: [err]})
                    })

                }).catch((err)=>{
                    console.log(err)
                    res.status(400).json({message: 'failed', error: [err]})
                })

            }).catch((err)=>{
                console.log(err)
                res.status(400).json({message: 'failed', error: [err]})
                
            })
        }
    }).catch((err)=>{        
        console.log(err)        
        res.status(400).json({message: 'failed', error: [err]})    
    })
})

module.exports = Router;