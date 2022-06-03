const mongoose = require('mongoose');
const Joi = require('joi');
const userSchema = new mongoose.Schema({
    name: { type: String , minlength: 5 , required: true},
    age: { type: Number , min: 18 , max: 50 ,required: true},
    job: { type: String , minlength: 5 , required: true},
});


const User = mongoose.model('user', userSchema);


module.exports.User = User;
module.exports.validateUser = validateUser;

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        age: Joi.number().min(18).max(50).required(),
        job:  Joi.string().min(5).required()
    });
    return schema.validate(user);
}