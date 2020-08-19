const express = require('express');
const Router = express.Router();
const path = require('path');

Router.use('/', require('./register'));
Router.use('/auth', require('./authentication'));
Router.use('/dashboard', require('./dashboard'));

Router.use('/ingestion', require('./configureIngestionJobs'));
module.exports = Router;
