const mongoose = require('mongoose');

const menu = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true,
    },

})

const menuItem = mongoose.model('Menu',menu);
module.exports = menuItem;