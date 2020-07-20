const express=require('express');
const {check,validationResult} =require('express-validator');

const Bookmark=require('../models/Bookmark');
const Tag=require('../models/Tag');

const router =express.Router()

// Boookmarking api


// creating a bookmark
// @routes: "/create"
// data: link,title,publisher
// Method: "POSt"

router.post('/create',
[
    check('link','link is required').not().isEmpty(),
    check('title','link is required').not().isEmpty(),
    check('publisher','link is required').not().isEmpty(),
],
async (req,res)=>{
    const errors =validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {link,title,publisher}=req.body;



    try {
        
        const bookmark =await Bookmark.findOne({link})

        if(bookmark){
            return res.status(404).json({msg:'bookmark is already present'})
        }

        const newbookmark=new Bookmark({
            link,
            title,
            publisher
        });

        const book= await newbookmark.save();

        res.json(book)


    } catch (err) {
        console.error(err.msg);
        res.status(500).send('server error')
    }
})


// deletin a bookmark
// @routes: "/delete/id"
// data: bookmarkid 
// Method: "delete"

router.delete('/delete/:id',async (req,res)=>{
    try {

        const bookmark= await Bookmark.findById(req.params.id);

        if(!bookmark){
            return res.status(404).json({msg:'bookmark not found'})
        }


        await bookmark.remove();


        res.json({msg:"bookmark removed"})
        
    } catch (err) {
        console.error(err.msg)
        res.status(500).send('server error')
    }
})




module.exports = router;