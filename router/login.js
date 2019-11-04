const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../models/Admin');
const Admin = mongoose.model('admins');

//Login
router.post('/', async (req, res) => {
    const resp = await Admin.findOne({ email: req.body.email })
    if (!resp) {
        res.json({
            success: false,
            message: "User Email Is Not Found"
        })
        return
    }

    bcrypt.compare(req.body.password, resp.password, (err, result) => {
        if (err) {
            res.json({
                success: false,
                message: "Incorrect Details"
            })
            return
        }
        if (result) {
            res.json({
                success: true
            })
            return
        }
        res.json({
            success: false,
            message: "Password is wrong"
        })
    })

})


module.exports = router;