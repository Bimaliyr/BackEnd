const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../models/Restaurentowner');
const Restaurentowner = mongoose.model('restaurentowners');


router.post('/', async (req, res) => {
    const existingrestaurentowner = await  Restaurentowner.findOne({ email: req.body.email })

    if (existingrestaurentowner) {
        res.json({
            success: false,
            message: "User Email already in use. Please enter another one"
        })
        return
    }

    await bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            const  restaurentowner = new  Restaurentowner({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
                email: req.body.email,
                restaurentname:req.body.restaurentname,
                contactno:req.body.contactno,
                address:req.body.address
            })
            restaurentowner.save().then(() => {
                res.json({
                    success: true,
                    message: "Restaurentowner registered" 
                })
            })
        });
    });
    })

  //get all 
router.get('/',(req,res) =>{
    Restaurentowner.find((err,docs) =>{
        if(!err){res.send(docs);}
        else{console.log('Error in Retriving :' +JSON.stringify(err,undefined,2));}
    });
});  

module.exports = router;