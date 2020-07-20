const mongoose =require('mongoose');

const BookmarkSchema=new mongoose.Schema({
    link:{
        type:String,
        required:true,
        unique:true
    },
    Title:{
        type:String,
        required:true,

    },
    publisher:{
        type:String,
        required:true
    },

    Tags:[
        {
            Tag:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'tag'
            }
        }
    ]

},{
    timestamps:true
})


module.exports =Bookmark = mongoose.model('bookmark',BookmarkSchema);