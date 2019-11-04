const mongoose = require('mongoose');

const  TableSchema = new mongoose.Schema({
    tableno: { type: String, required: true },
    tablesize: { type: Number, required: true },
    description:{type:String,require:true}
});

mongoose.model('tables', TableSchema);