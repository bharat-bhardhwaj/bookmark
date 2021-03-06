  
const mongoose =require('mongoose');

const config=require('config');

const db = config.get('mongodbURL');


const connectDb=async ()=>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('mongoDb is connected.....');
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}

module.exports=connectDb;