const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid');

require('./start/errors')();
require('./start/db')();

const app = express();
require('./start/routes')(app);


const PORT = process.env.PORT || 3000;


const server = app.listen(PORT,()=>{
    console.log(`Running on Port ${PORT}`);
})


module.exports = server;

