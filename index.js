const express =require('express');

const connectDb=require('./config/db');

//
const app=express();

app.use(express.json({extended:false}));


connectDb()

const PORT = process.env.PORT  || 5000;


// app.use('/',require('./routes/index'));



app.get('/',(req,res)=>{
    res.send("first rendering")
})


app.listen(PORT,()=>console.log(`Server started on post ${PORT}`));

