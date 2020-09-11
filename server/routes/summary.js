const db = require('../config/db.js');
const express = require('express');
const Router = express.Router();

Router.get('/getSummary/:entryid', (req, res)=>{
    let entry_id = req.params.entryid;

    db.DataCatalog.findAll({
        include: [db.Parameters, db.Schedule],
        where: {
            entryId: entry_id
        }
    }).then((response)=>{
        // console.log(response);
        let frame = [];
        response = JSON.parse(JSON.stringify(response))
        response.map((item , index)=>{
            console.log(Object.keys(item), item)
            frame.push({ fields: 'Entry ID', values: item.entryId })
            frame.push({ fields: 'Assigned Job ID', values: item.jobname });
            frame.push({fields: 'Job Title', values: item.jobtitle});
            frame.push({fields: 'Project Name', values: item.project_name});
            frame.push({fields: 'Status', values: item.status});
            frame.push({ fields: 'Created by', values: item.username })
            frame.push({ fields: 'Updated by', values: item.updated_by })
            frame.push({fields: 'Rationale', values: item.rationale})
            frame.push({fields: 'Operation', values: item.operation});
            frame.push({fields: 'Schedule type', values: item.Schedule.schedule_type});
            // if(item.Schedule.schedule_type.includes('Fixed')){
            //     frame.push({fields: 'Start time', values: item.Schedule.start_time});
            //     frame.push({fields: 'Start date', values: item.Schedule.start_date});
            //     frame.push({fields: 'End date', values: item.Schedule.end_date});
            // }else  if(item.Schedule.schedule_type.includes('One')){
            //     frame.push({fields: 'Start time', values: item.Schedule.start_time});
               
            // }
            frame.push({fields: 'Cron Job Time', values: item.cron_time})
            frame.push({ fields: 'Source Connection Name', values: JSON.parse(item.Parameter.SourceParameter).connection_name })
            frame.push({ fields: 'Target Connection Name', values: JSON.parse(item.Parameter.TargetParameter).connection_name })
        })

        res.status(200).json({message: 'successful', data: JSON.parse(JSON.stringify(frame))});
    }).catch((err)=>{
        res.status(400).json({message: 'failed', error: [err]});
    });
});

Router.get('/status/Created/:entryid', (req, res)=>{
    db.DataCatalog.update({
        status: 'Created'
    },
        {
            where: {
            entryId: req.params.entryid
        }
    }
    ).then((response)=>{
        db.Announcements.findOrCreate({
            entry_id: req.params.entryid,
            entry_status: 'draft',
            created_at: new Date(),
            recent: 0,
            description: '',
            where: {
                entry_id: req.params.entryid
            }
            
        }).then((response1)=>{
            res.status(200).json({message: 'Job Successfully Created'})
        }).catch((err)=>{
            console.log(err)
            res.status(400).json({message: 'Failed to create'})
        }
        )
    }).catch((err)=>{
        console.log(err)
        res.status(400).json({message: 'Failed'})
    })
})

module.exports = Router;