const db = require('../config/db.js');
const express = require('express');
const Router = express.Router();

// fetch the dropdown columns from metadata table 
// fetch the business rules for the dropdown
Router.get('/getCustomRuleDropdowns/:param', (req, res)=>{
    let entry_id = parseInt(req.params.entryid);

    let fetchMetadata = new Promise((resolve, reject)=>{
        db.Metadata.findAll({
            attributes: ['column_name', 'data_type'],
            where:{
                entry_id: entry_id
            },
            group: ['column_name', 'data_type']
        }).then((response)=>{
            resolve(JSON.parse(JSON.stringify(response)))
        }).catch((err)=>{
            console.log(err, "^^^^^^ 1 ")
            res.status(400).json({message: 'Failed to fetch rows from metadata table'})
        })
    });

    let fetchCentralRules = new Promise((resolve, reject)=>{
        db.CentralRules.findAll()
        .then((response)=>{
            resolve(JSON.parse(JSON.stringify(response)))
        }).catch((err)=>{
            console.log(err, "^^^^^^ ")
            res.status(400).json({message: 'Failed to fetch rows from central repo table'});
        })
    })

    Promise.all([fetchCentralRules, fetchMetadata])
    .then((results)=>{
        let frameFinal = {}
        frameFinal['entry_id'] = entry_id
        frameFinal['CentralRules'] = results[0]
        frameFinal['MetadataColumns'] = results[1]

        res.status(200).json({message: 'success', data: JSON.parse(JSON.stringify(frameFinal))})
    })

});

// save custom rules data
Router.post('/saveCustomRules', (req, res)=>{
    let request_data = req.body;

    let entry_id = request_data.entryid;

    let savecustomrulesdata = new Promise((resolve, reject)=>{

        db.CustomRules.destroy({
            where: {
                entry_id: entry_id
            }
        }).then((res)=>{
            db.CustomRules.create(request_data.customrules)
            .then((response)=>{
                resolve(JSON.parse(JSON.stringify(response)))
            }).catch((err)=>{
                console.log(err, "%%%")
                res.status(400).json({message: 'Failed to save in custom rules'})
            })

        }).catch((err)=>{
            console.log(err);
        })
    })

    let savebusinessrules = new Promise((resolve, reject)=>{
        let business_rules = request_data.businessrules;
        
        db.BusinessRules.destroy({
            where: {
                entry_id: entry_id
            }
        }).then((res)=>{
                for(let i = 0; i < business_rules.length; i++){
                    
                    db.BusinessRules.create(business_rules[i])
                    .then((result)=>{
                        if(i === business_rules.length-1){
                            resolve('finished')
                        }
                    }).catch((err)=>{
                        console.log(err, "()(()()()")
                        res.status(400).json({message: 'Error while saving business rules'})
                    });
               }
            }).catch((err)=>{
            console.log(err)
        })
    })

    Promise.all([savecustomrulesdata, savebusinessrules])
    .then((result)=>{
        if(result[0].length > 0 && result[1] === 'finished'){
            res.status(200).json({message: 'successful', entry_id: entry_id})
        }else{
            res.status(400).json({message: 'Error while saving the rules'})
        }
    })
})

// fetch the rules 
Router.post('/populateCustomRules', (req, res)=>{
    let request_data = req.body;

    let entry_id = request_data.entryid;

    let fetchcustomrules = new Promise((resolve, reject)=>{
        db.CustomRules.findAll({
            where: {
                entry_id: entry_id
            }
        }).then((response)=>{
            resolve(JSON.parse(JSON.stringify(response)));
        }).catch((err)=>{
            res.status(400).json({message: 'error fetching custom rules'})
        })
    })

    let fetchbusinessrules = new Promise((resolve, reject)=>{
        db.BusinessRules.findAll({
            where: {
                entry_id: entry_id
            }
        }).then((response)=>{
            resolve(JSON.parse(JSON.stringify(response)));
        }).catch((err)=>{
            res.status(400).json({message: 'error fetching business rules'})
        })
    })

    Promise.all([fetchcustomrules, fetchbusinessrules])
    .then((result)=>{
        let frameFinal = {};
        frameFinal['customrules'] = result[0];
        frameFinal['businessrules'] = result[1];

        res.status(200).json({message: 'success', data: JSON.parse(JSON.stringify(frameFinal))})
    })
})

module.exports = Router;