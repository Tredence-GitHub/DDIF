const db = require('../config/db.js');
const express = require('express');
const Router = express.Router();
const notebook = require('./notebooks/notebook.js');

const triggerNotebook = async (entryId, scheduletype, crontime) => {
    const data = {
        "name": 'Sample job',
        "existing_cluster_id": '0417-064140-cask871',
        "timeout_seconds": 300,
        "max_retries": 1,
        "schedule": {
        "quartz_cron_expression": crontime,  
        "timezone_id": "America/Los_Angeles"     
        },
        "notebook_task": {
        "notebook_path": "/Shared/DataIngestionV2",
        "base_parameters": { 
            "EntryId": entryId,
            "SchedulerType": scheduletype,
            
        } 
        }
    }

    let frameresp = {}
    
    let notebookRes = await notebook.jobTrigger(data);

    frameresp['schedule_job_id'] = notebookRes.job_id

    return frameresp;
    
}


Router.post('/schedule', async(req, res)=>{
    let request_data = req.body;
    let scheduletype = 'schedule';

    let result = await triggerNotebook(request_data.entryid, scheduletype, request_data.crontime);
    if(result != {}){
        db.DataCatalog.update({
            status: 'Scheduled',
            schedule_job_id: result.schedule_job_id
        },{
            where:{
                entryId: request_data.entryid
            }
        }).then((resp)=>{
            res.status(200).json({message: 'success' ,data: result});
        }).catch((err)=>{
            res.status(200).json({message: 'Failed to update status'})
        })
    }else{
        res.status(200).json({message: 'Failed to create a job'})
    }
    

})

Router.post('/killjob', async(req, res)=>{
    
    let request_data = req.body;
    let scheduletype = 'schedule';
    let job_id = request_data.job_id;

    let result = await notebook.killJob({"job_id": job_id});
    // if(result != {}){
    //     res.status(400).json({message: 'Job ID does not exit'})
    // }else{
        db.DataCatalog.update({
            status: 'Created'
        },{
            where:{
                entryId: request_data.entryid
            }
        }).then((resp)=>{
            res.status(200).json({messsage: 'Successfully terminated the job', data: result});
        }).catch((err)=>{
            res.status(200).json({message: 'Could not terminate the job. Please try again later!'})
        })
    // }
})

module.exports = Router;