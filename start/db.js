const mongoose = require('mongoose');
const config = require('config');

module.exports = function(){
    mongoose.connect(config.get('db'))
    .then(()=>console.log(`connected to mongoDB...`))
    .catch((err)=>console.log(`DatabaseConnectionError: `,err));
}