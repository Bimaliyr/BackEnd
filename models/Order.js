const mongoose = require('mongoose');

const  OrderSchema = new mongoose.Schema({
    itemid:{ type:String, require:true},
    itemname: { type: String, required: true },
    itemprice:{type:String,require:true} ,
    
});

mongoose.model('order', OrderSchema);