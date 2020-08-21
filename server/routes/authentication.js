const db = require('../config/db.js');
const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;

Router.post('/authenticateUser', (req, res)=>{
    let request_data = req.body;
    db.Users.findAll({
            where: {
                username: request_data.username,
            }
        }).then((result)=>{
            if(result.length > 0){
                bcrypt.compare(request_data.password, result[0].dataValues.password, (err, response) =>{
                    if(response === true){
                        res.status(200).json({message: 'successful', data: JSON.parse(JSON.stringify(result))});
                    }else{
                        console.log('FAILED TO MATCH !! ', err, res)
                        res.status(400).json({message: 'You are not registered with us! Please register!'});
                    }
                })
            }else{
                res.status(400).json({message: 'You are not registered with us! Please register!'});
            }
        }).catch((err)=>{
            console.log('ERROR -- ', err)
            res.status(400).json({message: 'Failed in login', error: [err]});
        })
    
      
})

Router.post('/forgotpassword', (req, res)=>{
    let request_data = req.body;
   
    bcrypt.hash(request_data.password, saltRounds, (err, hash) => {
        // Now we can store the password hash in db.
        if(!err)
            {db.Users.findAll({
                where: {
                    username: request_data.username
                }
            }).then((result)=> {
                if(result.length > 0){
                    db.Users.update({
                        password: hash
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
        }
        else{
            console.log(err);
            res.status(400).json({message: 'Failed to encrypt password', error: [err]});
        }
      });
})


module.exports =  Router;