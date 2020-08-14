const express = require('express');
const path =  require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const db  = require('./config/db.js')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', require('./routes/route'));

db.sequelize.sync({force: false}).then(() => {
    console.log('Successfully connected the DB ....')
    app.listen(4000, ()=>{
    console.log('App is running on port 4000 .... ');
    })
})