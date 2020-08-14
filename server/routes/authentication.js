const db = require('../config/db.js');
const express = require('express');
const Router = express.Router();

Router.post('/authenticateUser', (req, res)=>{
    let request_data = req.body;
    db.Users.findAll({
        where: {
            username: request_data.username,
            password: request_data.password
        }
    }).then((result)=>{
        if(result.length > 0){
            res.status(200).json({message: 'successfull', data: JSON.parse(JSON.stringify(result))});
        }else{
            res.status(400).json({message: 'You are not registered with us! Please register!'});
        }
    }).catch((err)=>{
        res.status(400).json({message: 'Failed in login', error: [err]});
    })
})

Router.post('/forgotpassword', (req, res)=>{
    db.Users.findAll({
        where: {
            username: request_data.username
        }
    }).then((result)=> {
        if(result.length > 0){
            db.Users.update({
                password: request_data.password
            },{
                where: {
                username: request_data.username
             }
            }).then((result)=>{
                res.status(200).json({message: 'Password successfully changed!', data: []});
            }).catch((err)=>{
                res.status(400).json({message: 'Failed to change password!', error: [err]});
            })
        }
        else{
            res.status(200).json({message: 'Username not found !'});
        }
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({message: 'Failed to change password', error: [err]});
    })
})


module.exports =  Router;