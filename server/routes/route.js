const express = require('express');
const Router = express.Router();
const path = require('path');

Router.use('/', require('./register'));
Router.use('/auth', require('./authentication'));

module.exports = Router;
