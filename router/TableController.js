const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const ObjectId = router ('mongoose').Types.ObjectId;
const ObjectId = mongoose.Schema.Types.ObjectId;

require('../models/Table');
const Table = mongoose.model('tables');

//get all tables
router.get('/',(req,res) =>{
    Table.find((err,docs) =>{
        if(!err){res.send(docs);}
        else{console.log('Error in Retriving :' +JSON.stringify(err,undefined,2));}
    });
});

//get one table by Id
router.get('/:id',(req,res)=>{
    Table.findById(req.params.id,(err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in Retriving :'+JSON.stringify(err,undefined,2));}
    });  
});

// add tables
router.post('/', (req, res) => {
    const table = new Table({
        tableno:req.body.tableno ,
        tablesize:req.body.tablesize,  
        description:req.body.description
    });
    table.save((err,doc) =>{
      if(!err){res.send(doc);}
      else{console.log('Error in table save:' + JSON.stringify(err,undefined,2));}
    });
    });

//update table
router.put('/:id',(req,res) =>{
//if(!objectId.isValid(req.param.id))
//return res.status(400).send(`No record with given id:${req.params.id}`);

const table =  {
    tableno:req.body.tableno ,
    tablesize:req.body.tablesize,  
    description:req.body.description
};
Table.findByIdAndUpdate(req.params.id, {$set:table},{new:true},(err,doc) =>{
    if(!err){res.send(doc);}
    else{console.log('Error in Table update:' +JSON.stringify(err,undefined,2));}
});
});  

//delete table
router.delete('/:id',(req,res) =>{

    Table.findByIdAndRemove(req.params.id, (err,doc)=>{
      if(!err){res.send(doc);}
      else{ console.log('Error in table Delete :' +JSON.stringify(err,undefined,2));}
    });
});

module.exports = router;