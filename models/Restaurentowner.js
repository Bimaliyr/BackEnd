const mongoose = require('mongoose');

const RestaurentownerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    restaurentname:{type:String, required:true},
    contactno:{type:Number,required:true},
    address:{type:String,required:true}
});

mongoose.model('restaurentowners', RestaurentownerSchema);