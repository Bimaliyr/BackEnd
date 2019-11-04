const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Menu');
const Menue = mongoose.model('menu');

//get all item
router.get('/',(req,res) =>{
    Menue.find((err,docs) =>{
        if(!err){res.send(docs);}
        else{console.log('Error in Retriving :' +JSON.stringify(err,undefined,2));}
    });
});

//get one item by Id
router.get('/:id',(req,res)=>{
    Menue.findById(req.params.id,(err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in Retriving :'+JSON.stringify(err,undefined,2));}
    });  
});

// add item
router.post('/', (req, res) => {
    const menu = new Menue({
        photoUrl:req.body.photoUrl,
        itemname:req.body.itemname,  
        itemprice:req.body.itemprice
    });
    menu.save((err,doc) =>{
      if(!err){res.send(doc);}
      else{console.log('Error in item save:' + JSON.stringify(err,undefined,2));}
    });
    });

//update item
router.put('/:id',(req,res) =>{
//if(!objectId.isValid(req.param.id))
//return res.status(400).send(`No record with given id:${req.params.id}`);

const menu =  {
    
    photoUrl:req.body.photoUrl,
    itemname:req.body.itemname,  
    itemprice:req.body.itemprice
};
Menue.findByIdAndUpdate(req.params.id, {$set:menu},{new:true},(err,doc) =>{
    if(!err){res.send(doc);}
    else{console.log('Error in item update:' +JSON.stringify(err,undefined,2));}
});
});  

//delete item
router.delete('/:id',(req,res) =>{

    Menue.findByIdAndRemove(req.params.id, (err,doc)=>{
      if(!err){res.send(doc);}
      else{ console.log('Error in table Delete :' +JSON.stringify(err,undefined,2));}
    });
});



module.exports = router;