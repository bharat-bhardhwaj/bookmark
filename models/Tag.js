const mongoose =require('mongoose');

const TagSchema=new mongoose.Schema({
    Title:{
        type:String,
        required:true,
        unique:true
    }

},{
    timestamps:true
})


module.exports =Tag = mongoose.model('tag',TagSchema);