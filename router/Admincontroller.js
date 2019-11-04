const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../models/Admin');
const Admin = mongoose.model('admins');

router.post('/', async (req, res) => {
    const existingadmin = await Admin.findOne({ email: req.body.email })

    if (existingadmin) {
        res.json({
            success: false,
            message: "User Email already in use. Please enter another one"
        })
        return
    }

    await bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            const admin = new Admin({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
                email: req.body.email
            })
            admin.save().then(() => {
                res.json({
                    success: true,
                    message: "admin registered" 
                })
            })
        });
    });
    })

module.exports = router;