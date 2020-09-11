const db = require('../config/db.js');
const express = require('express');
const Router = express.Router();
const notebook = require('./notebooks/notebook.js');

// get all data
Router.get('/getConnections', (req, res)=>{
    db.Connections.findAll()
    .then((result)=>{
        res.status(200).json({data: JSON.parse(JSON.stringify(result))})
    }).catch((err)=>{
        res.status(400).json({message: 'Failed'});
    })
})

Router.get('/getById/:row_id', (req, res)=>{
    let row_id = parseInt(req.params.row_id);
    console.log(row_id);

    db.Connections.findAll({
        where: {
            row_id: row_id
        }
    }).then((result)=>{
        res.status(200).json({data: JSON.parse(JSON.stringify(result))})
    }).catch((err)=>{
        res.status(400).json({message: 'Failed'});
    })
})

const triggerNotebook = async (info) => {
    console.log(info, "\n>>>>>>")
    const data = {
        'job_id': 860,
        'notebook_params': info
    }
    let notebookRes = await notebook.notebookTrigger(data);
    notebookRes = JSON.stringify(notebookRes)

    let response = await notebook.runTestConnection(notebookRes);
    do{
        response =  await notebook.runTestConnection(notebookRes);
        if(response === 'Failed'){
            return 'Failed'
        }
        console.log(response, "IN DO WHILE ");
    }while(response === 'PENDING');

    return response;
    
}

// Save data
Router.post('/saveConnection', async (req, res)=>{
    let request_data = req.body;
    let portnumber = 0;
    if(request_data.format !== 'link'){
        if(request_data.port == ''){
            portnumber = 0;
        }else{
            portnumber = parseInt(request_data.port)
        }
        let odbc_connection_test = await triggerNotebook({
            type_id: request_data.type_id,
            type: request_data.type,
            connection_type: request_data.format,
            hostname: request_data.hostname,
            account_name: request_data.account_name,
            account_key: request_data.account_key,
            location_name: request_data.location_name,
            port: portnumber,
            source_query: request_data.source_query,
            path: request_data.path,
            delimiter: request_data.delimiter
            
        });
        
        console.log(odbc_connection_test, "RESPONSE *** ")
        if(odbc_connection_test.result === 'Failed' || odbc_connection_test === 'Failed'){
            res.status(200).json({message: 'Test Connection failed! Please check your inputs.'})
        }else if(odbc_connection_test.result === 'Connection Successful'){

            db.Connections.findAll({
                where: {
                    connection_name : request_data.connection_name
                }
            }).then((result)=>{
                if(result.length > 0){
                    res.status(200).json({message: 'The Source Name already exists, Please use a different connection name.'});
                }
                else{
                    if(request_data.default === 1){
                        db.Connections.update({
                            default: 0
                        }, {
                            where: {
                                type_id: request_data.type_id,
                                type: request_data.type
                            }
                        }).then((result)=>{
                            db.Connections.create({
                                type: request_data.type,
                                type_id: request_data.type_id,
                                connection_name: request_data.connection_name,
                                default: request_data.default,
                                format: request_data.format,
                                hostname: request_data.hostname,
                                account_name: request_data.account_name,
                                account_key: request_data.account_key,
                                port: request_data.port,
                                source_query: request_data.source_query,
                                location_name: request_data.location_name,
                                delimiter: request_data.delimiter,
                                path: request_data.path,
                                file_type: request_data.file_type,
                            }).then((result)=>{
                                res.status(200).json({message: 'Record created!'});
                            }).catch((err)=>{
                                console.log(err)
                                res.status(400).json({message: 'Failed to save', error: [err]})
                            })
                        }).catch((err)=>{
                        })
                    }
                    else{
                    db.Connections.create({
                        type: request_data.type,
                        type_id: request_data.type_id,
                        connection_name: request_data.connection_name,
                        default: request_data.default,
                        format: request_data.format,
                        hostname: request_data.hostname,
                        account_name: request_data.account_name,
                        account_key: request_data.account_key,
                        port: request_data.port,
                        source_query: request_data.source_query,
                        location_name: request_data.location_name,
                        delimiter: request_data.delimiter,
                        path: request_data.path,
                        file_type: request_data.file_type,
                    }).then((result)=>{
                        res.status(200).json({message: 'Record created!'});
                    }).catch((err)=>{
                        console.log(err)
                        res.status(400).json({message: 'Failed to save', error: [err]})
                    })
                }
                }
            })
        }
    }

    else{
        db.Connections.findAll({
            where: {
                connection_name : request_data.connection_name
            }
        }).then((result)=>{
            if(result.length > 0){
                res.status(200).json({message: 'The Source Name already exists, Please use a different connection name.'});
            }
            else{
                if(request_data.default === 1){
                    db.Connections.update({
                        default: 0
                    }, {
                        where: {
                            type_id: request_data.type_id,
                            type: request_data.type
                        }
                    }).then((res)=>{
                        db.Connections.create({
                            type: request_data.type,
                            type_id: request_data.type_id,
                            connection_name: request_data.connection_name,
                            default: request_data.default,
                            format: request_data.format,
                            hostname: request_data.hostname,
                            account_name: request_data.account_name,
                            account_key: request_data.account_key,
                            port: request_data.port,
                            source_query: request_data.source_query,
                            location_name: request_data.location_name,
                            delimiter: request_data.delimiter,
                            path: request_data.path,
                            file_type: request_data.file_type,
                        }).then((result)=>{
                            res.status(200).json({message: 'Record created!'});
                        }).catch((err)=>{
                            console.log(err)
                            res.status(400).json({message: 'Failed to save', error: [err]})
                        })
                    }).catch((err)=>{
                    })
                }
                else{
                db.Connections.create({
                    type: request_data.type,
                    type_id: request_data.type_id,
                    connection_name: request_data.connection_name,
                    default: request_data.default,
                    format: request_data.format,
                    hostname: request_data.hostname,
                    account_name: request_data.account_name,
                    account_key: request_data.account_key,
                    port: request_data.port,
                    source_query: request_data.source_query,
                    location_name: request_data.location_name,
                    delimiter: request_data.delimiter,
                    path: request_data.path,
                    file_type: request_data.file_type,
                }).then((result)=>{
                    res.status(200).json({message: 'Record created!'});
                }).catch((err)=>{
                    console.log(err)
                    res.status(400).json({message: 'Failed to save', error: [err]})
                })
            }
            }
        })
    }

})

// update data
Router.post('/updateConnection', async(req, res)=>{
    let request_data = req.body;
    let portnumber = 0;
    if(request_data.format !== 'link'){
        if(request_data.port == ''){
            portnumber = 0;
        }else{
            portnumber = parseInt(request_data.port)
        }
        let odbc_connection_test = await triggerNotebook({
            type_id: request_data.type_id,
            type: request_data.type,
            connection_type: request_data.format,
            hostname: request_data.hostname,
            account_name: request_data.account_name,
            account_key: request_data.account_key,
            location_name: request_data.location_name,
            port: portnumber,
            source_query: request_data.source_query,
            path: request_data.path,
            delimiter: request_data.delimiter})

        if(odbc_connection_test.result === 'Connection Successful'){
            db.Connections.findAll({
                where: {
                connection_name: request_data.connection_name,
                row_id: {
                    [db.Op.not]: request_data.row_id
                    }
                }
            }).then((result)=>{
                if(result.length>0){
                    res.status(200).json({message: 'Connection name is already defined.'});
                }else{
                    if(request_data.default === 1){
                        db.Connections.update({
                            default: 0
                        }, {
                            where: {
                                type_id: request_data.type_id,
                                type: request_data.type
                            }
                        }).then((result)=>{
                            db.Connections.update(
                                request_data,{
                                
                                where:{
                                    row_id: request_data.row_id
                                }
                            }).then((result)=>{
                                res.status(200).json({message: 'Succesfully updated'});
                            }).catch((err)=>{
                                res.status(400).json({message: 'Failed', error: [err]})
                            })
                        }).catch((err)=>{
                            res.status(400).json({message: 'Failed', error: [err]})
                        })
                    }
                    else{
                        db.Connections.update(
                            request_data,{                    
                            where:{
                                row_id: request_data.row_id
                            }
                        }).then((result)=>{
                            res.status(200).json({message: 'Succesfully updated'});
                        }).catch((err)=>{
                            res.status(400).json({message: 'Failed', error: [err]})
                        })
                    }
                }
            }).catch((err)=>{
                console.log(err)
                res.status(400).json({message: 'Failed to update'})
            })
        }
        else{
            res.status(200).json({message: 'Test Connection failed! Please check your inputs.'})
        }
    }
    else{
        
        db.Connections.findAll({
            where: {
            connection_name: request_data.connection_name,
            row_id: {
                [db.Op.not]: request_data.row_id
                }
            }
        }).then((result)=>{
            if(result.length>0){
                res.status(200).json({message: 'Connection name is already defined.'});
            }else{
                if(request_data.default === 1){
                    db.Connections.update({
                        default: 0
                    }, {
                        where: {
                            type_id: request_data.type_id,
                            type: request_data.type
                        }
                    }).then((res)=>{
                        db.Connections.update(
                            request_data,{
                            
                            where:{
                                row_id: request_data.row_id
                            }
                        }).then((result)=>{
                            res.status(200).json({message: 'Succesfully updated'});
                        }).catch((err)=>{
                            res.status(400).json({message: 'Failed', error: [err]})
                        })
                    }).catch((err)=>{
                        res.status(400).json({message: 'Failed', error: [err]})
                    })
                }
                else{
                    db.Connections.update(
                        request_data,{                    
                        where:{
                            row_id: request_data.row_id
                        }
                    }).then((result)=>{
                        res.status(200).json({message: 'Succesfully updated'});
                    }).catch((err)=>{
                        res.status(400).json({message: 'Failed', error: [err]})
                    })
                }
            }
        }).catch((err)=>{
            console.log(err)
            res.status(400).json({message: 'Failed to update'})
        })
    }
})

Router.get('/deleteInfo/:id', (req, res)=>{
    db.Connections.destroy({
        where:{
            row_id: req.params.id
        }
    }).then((result)=>{
        res.status(200).json({message: 'success'})
    }).catch((err)=>{
        res.status(400).json({message: [err]})
    })
})

// send owners dropdown
Router.get('/getUsers', (req, res)=>{
    db.Users.findAll()
    .then((result)=>{
        res.status(200).json({message: 'success', data: JSON.parse(JSON.stringify(result))})
    }).catch((err)=>{
        res.status(400).json({message: [err]})
    })
})


// save details
Router.post('/saveProject', (req, res)=>{
    let request_data = req.body;

    if(request_data.entrytype == 'existing'){

        db.BusinessFunctions.create({
            project_type: parseInt(request_data.project_type),
            project_name: request_data.business_function,
            description: request_data.description,
            owner: request_data.owner
        }).then((result)=>{
            res.status(200).json({message: 'success'})
        }).catch((err)=>{
            res.status(400).json({message: [err]})
        })
    }
    else{

        db.ProjectTypes.create({
            project_type: request_data.project_type
        }).then((result)=>{
            let jResult = JSON.parse(JSON.stringify(result));

            db.BusinessFunctions.create({
                project_type: jResult['typeId'],
                project_name: request_data.business_function,
                description: request_data.description,
                owner: request_data.owner
            }).then((result2)=>{
                res.status(200).json({message: 'success'})
            }).catch((err)=>{
                res.status(400).json({message: [err]})
            })

        }).catch((err)=>{
            res.status(400).json({error: [err]})
        })
    }

})

// fetch all records
Router.get('/allProjects', (req, res)=>{
    db.BusinessFunctions.findAll({
        include: [db.ProjectTypes]
    }).then((result)=>{
        console.log(result);
        res.status(200).json({message: 'success', data: JSON.parse(JSON.stringify(result))})
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({message: [err]})
    })
})

Router.get('/deleteProject/:rowid', (req, res)=>{
    db.BusinessFunctions.destroy({
        where:{
            row_id: parseInt(req.params.rowid)
        }
    }).then((result)=>{
        res.status(200).json({message: "Deleted"})
    }).catch((err)=>{
        res.status(400).json({message: [err]})
    })
})

Router.post('/updateProject', (req, res)=>{
    let request_data = req.body;

    db.BusinessFunctions.update({
        project_type: parseInt(request_data.project_type),
        project_name: request_data.business_function,
        description: request_data.description,
        owner: request_data.owner
    }, {
        where:{
            row_id:  request_data.row_id
        }
    }).then((result2)=>{
        res.status(200).json({message: 'Updated details'})
    }).catch((err)=>{
        res.status(400).json({message: [err]})
    })
})

Router.get('/getProjectById/:rowid', (req, res)=>{
        db.BusinessFunctions.findAll({  
                  where: {  
                    row_id: req.params.rowid
                }   
        }).then((result)=>{        
                res.status(200).json({message: 'success', data: JSON.parse(JSON.stringify(result))}) 
        }).catch((err)=>{
                res.status(400).json({message: [err]})    }) 
    })

module.exports = Router;