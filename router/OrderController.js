const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Order');
const Order = mongoose.model('order');



//get all order
router.get('/',(req,res) =>{
    Order.find((err,docs) =>{
        if(!err){res.send(docs);}
        else{console.log('Error in Retriving :' +JSON.stringify(err,undefined,2));}
    });
});

//get one order by Id
router.get('/:id',(req,res)=>{
    Order.findById(req.params.id,(err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in Retriving :'+JSON.stringify(err,undefined,2));}
    });  
});

//delete order
router.delete('/:id',(req,res) =>{

    Menue.findByIdAndRemove(req.params.id, (err,doc)=>{
      if(!err){res.send(doc);}
      else{ console.log('Error in table Delete :' +JSON.stringify(err,undefined,2));}
    });
});

