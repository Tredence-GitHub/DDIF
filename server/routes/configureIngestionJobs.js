const db = require('../config/db.js');
const express = require('express');
const Router = express.Router();
const notebook = require('./notebooks/notebook.js');
const Moment = require('moment');


// get all the information for the data table
Router.post('/getRecords', (req, res)=>{
    db.DataCatalog.findAll({
        include: [db.Schedule]
    })
    .then((result)=>{
        res.status(200).json({message: 'successful', data: JSON.parse(JSON.stringify(result))});
    }).catch((err)=>{
        console.log(err);
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

                    let saveSchedule = new Promise((resolve, reject) =>{
                        db.Schedule.create({
                        job_id: result.entryId,
                        jobname: request_data.jobname,
                        schedule_type: request_data.schedule_type,
                        recurrence_type: request_data.recurrence_type,
                        recurrence: request_data.recurrence,
                        days: request_data.days,
                        start_time: Moment(request_data.start_time).format("YYYY-MM-DD HH:mm:ss"),
                        start_date: Moment(request_data.start_date).format("YYYY-MM-DD HH:mm:ss"),
                        end_date: Moment(request_data.end_date).format("YYYY-MM-DD HH:mm:ss")

                    }).then((scheduleRes)=>{
                        resolve(JSON.parse(JSON.stringify(scheduleRes)));
                    }).catch((err)=>{
                        console.log(err);
                        reject(err);
                    })
                 })

                    let saveParameters = new Promise((resolve, reject)=> {

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
                            
                            resolve(JSON.parse(JSON.stringify(parametersRes)));
                            
    
                            
                        }).catch((err)=>{
                            console.log(err)
                            reject(err);
                        })
                    }) 
                    
                    Promise.all([saveParameters, saveSchedule]).then((results)=>{
                        let frameFinal = {};
                            frameFinal['entry_id'] = result.entryId;
                            frameFinal['parameters'] = JSON.parse(JSON.stringify(saveParameters));
                            frameFinal['Schedule'] = JSON.parse(JSON.stringify(saveSchedule));
                        console.log(results[0], results[1]);
                        if(results[0] !={} && results[1]!={}){
                            res.status(200).json({message: 'Successful', data: JSON.parse(JSON.stringify(frameFinal)) });
                        }else{
                            res.status(400).json({message: 'failed', error: []})
                        }
                    }).catch((err2)=>{
                        console.log(err2, "***");
                        res.status(400).json({message: 'failed', error: [err2], data: []})
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

const triggerNotebook = async (jobId, entryId) => {
    const data = {
        'job_id': jobId,
        'notebook_params': {
            'entryid': '300'
        }
    }
    let notebookRes = await notebook.notebookTrigger(data);
    notebookRes = JSON.stringify(notebookRes)

    let response = await notebook.runJobResponse(notebookRes);
    do{
        response =  await notebook.runJobResponse(notebookRes);
        if(response === 'Failed'){
            return 'Failed'
        }
        console.log(response, "IN DO WHILE ");
    }while(response === 'PENDING');

    return response;
    
}

Router.post('/api/getMetadata',async (req, res) => {
    let request_data = req.body;

    let finalRes = await triggerNotebook(31, request_data.entryId);
    if(finalRes !== 'Failed') {
        let metadata = JSON.parse(JSON.stringify(finalRes.result));

        res.status(200).json({message: 'success', data: JSON.parse(JSON.stringify(metadata))})
    }else{
        res.status(400).json({message: 'failed', data: finalRes})

    }
})


module.exports = Router;