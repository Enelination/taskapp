const mongoose = require('mongoose')


//create schema
const ItemSchema = new mongoose.Schema({
    name:{
        type:'String',
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Item', ItemSchema)