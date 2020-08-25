const db = require('../config/db.js');
const express = require('express');
const Router = express.Router();

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

// Save data
Router.post('/saveConnection', (req, res)=>{
    let request_data = req.body;
    
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
})

// update data
Router.post('/updateConnection', (req, res)=>{
    let request_data = req.body;
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
})

module.exports = Router;