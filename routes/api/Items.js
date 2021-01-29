const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router()


//item model
const Item = require("../../model/Item")

//@route Get api/items
//@desc Get All Items

router.get('/', (req, res)=>{
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items))
})

//@route POST api/items
//@desc Add All Items

router.post('/', auth, (req, res)=>{
    const newItem = new Item({
        name: req.body.name
    })
    newItem.save()
    .then(item => res.json(item));
})

//@route DELETE api/items
//@desc Delete All Items

router.delete ('/:id',auth, (req, res)=>{
    Item.findById(req.params.id)
    .then(item => item.remove().then(()=> res.json({success:true})))
    .catch(err => res.status(404).json({success:false}))
    
})


module.exports =  router;