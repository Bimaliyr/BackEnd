const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../models/Customer');
const Customer = mongoose.model('customers');

router.post('/', async (req, res) => {
    const existingcustomer = await Customer.findOne({ email: req.body.email })

    if (existingcustomer) {
        res.json({
            success: false,
            message: "User Email already in use. Please enter another one"
        })
        return
    }

    await bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            const customer = new Customer({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
                email: req.body.email
            })
            customer.save().then(() => {
                res.json({
                    success: true,
                    message: "Customer registered" 
                })
            })
        });
    });
    })


      //get all 
router.get('/',(req,res) =>{
    Customer.find((err,docs) =>{
        if(!err){res.send(docs);}
        else{console.log('Error in Retriving :' +JSON.stringify(err,undefined,2));}
    });
});  


module.exports = router;