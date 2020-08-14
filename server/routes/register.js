const db = require('../config/db.js');
const express = require('express');
const Router = express.Router();

Router.post('/register', (req, res)=> {
    let request_data = req.body;

    db.Users.findAll({
        where:{
            username: request_data.username
        }
    }).then((userexisted)=>{
        if(userexisted.length > 0){
            res.status(200).json({message: 'Username is already taken! Please choose a different username or login!', data: []})
        }
        else{
            db.Users.create(request_data).then((result)=>{
                console.log(result);
                res.status(200).json({message: 'Congratulations! You are registered with us!', data: [{username: request_data.username, name: request_data.name}]});
            }).catch((err)=>{
                console.log(err, 'Registration failed !');
                res.status(400).json({message: 'Failed to register the user!', error: [err]});
            })
        }
    }).catch((err)=>{
        console.log(err, 'Registration failed !');
        res.status(400).json({message: 'Failed to register the user!', error: [err]});
    })
});

module.exports = Router;