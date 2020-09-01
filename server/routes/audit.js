const express = require('express');
const Router = express.Router();
const db = require('../config/db.js');

Router.get('/getRecords/:entryid', (req, res)=>{

    if(req.params.entryid > 0){
        db.Audit.findAll({
            where: {
                entryId: req.params.entryid
            }
        })
        .then((result)=>{
            res.status(200).json({message: 'success', data: JSON.parse(JSON.stringify(result))})
        }).catch((err)=>{
            console.log(err);
            res.status(400).json({message: failed, error: [err]});
        })
    }
    else{
        db.Audit.findAll()
        .then((result)=>{
            res.status(200).json({message: 'success', data: JSON.parse(JSON.stringify(result))})
        }).catch((err)=>{
            console.log(err);
            res.status(400).json({message: failed, error: [err]});
        })
    }
})



module.exports = Router;