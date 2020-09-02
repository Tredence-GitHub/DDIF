const express = require('express');
const Router = express.Router();
const path = require('path');

Router.use('/', require('./register'));
Router.use('/auth', require('./authentication'));
Router.use('/dashboard', require('./dashboard'));
Router.use('/administration', require('./administration'));
Router.use('/customrules', require('./customrules'));
Router.use('/summary', require('./summary.js'));
Router.use('/job', require('./scheduleJob.js'));
Router.use('/ingestion', require('./configureIngestionJobs'));
Router.use('/audit', require('./audit.js'))

module.exports = Router;
