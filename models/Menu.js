const mongoose = require('mongoose');

const  MenuSchema = new mongoose.Schema({
    photoUrl:{ type:String, require:true},
    itemname: { type: String, required: true },
    itemprice:{type:String,require:true}
});

mongoose.model('menu', MenuSchema);