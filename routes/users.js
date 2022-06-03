const express = require('express');
const Joi = require('joi');
const validateObjectId = require('../middleware/validateObjectId');
const {User, validateUser} =require('../models/userSchema');

const router = express.Router();

router.get('/',async(req,res)=>{
   const user =  await User.find({});
   res.send(user);
});

router.get('/:id', validateObjectId,async(req,res)=>{
    const user = await  User.findById(req.params.id);
    if(!user) return res.status(400).send(`User NOT FOUND`);
    res.send(user);
});

router.post('/add', async(req,res)=>{
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const result = await User.findOne({name: req.body.name})
    if(result) return res.status(400).send(`User already exists`);

   const user =  new User({
        name: req.body.name,
        age: req.body.age,
        job: req.body.job
    });

    await user.save();
    res.send(user);

});

router.delete('/:id',validateObjectId,async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
});

router.put('/new/:id',validateObjectId,async(req,res)=>{
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await  User.findById(req.params.id).select({_id: 0});
    if(!user) return res.status(404).send(`User NOT FOUND`);

    try{
         user = await User.findByIdAndUpdate({_id: req.params.id},{
            $set: {
                name: req.body.name ,
                age: req.body.age,
                job: req.body.job
            }
        },{new: true});

        res.send(user);
    }catch(ex){
        console.log(ex);
        res.status(500).send(`Internal Server failed`);
    }

});

module.exports = router;