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



// tags api


// creating a tag
// @routes: "/createtag"
// data: title
// Method: "POSt"
router.post('/createtag',
[
    
    check('title','title is required').not().isEmpty(),
    
],
async (req,res)=>{
    const errors =validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {title}=req.body;



    try {
        
        const tag =await Tag.findOne({title})

        if(tag){
            return res.status(404).json({msg:'tag is already present'})
        }

        const newtag=new Tag({
            title
            
        });
        
        const tagb= await newtag.save();
       
        res.json(tagb)


    } catch (err) {
        console.error(err);

        res.status(500).send('server error')
    }
})


// deleting a bookmark
// @routes: "/deletetag/id"
// data: tagid 
// Method: "delete"

router.delete('/deletetag/:id',async (req,res)=>{
    try {

        const tag= await Tag.findById(req.params.id);

        if(!tag){
            return res.status(404).json({msg:'tag not found'})
        }


        await Tag.remove();


        res.json({msg:"tag removed"})
        
    } catch (err) {
        console.error(err.msg)
        res.status(500).send('server error')
    }
})




// add a tag
// @routes: "/add/:bookmark_id/:tag_id"
// Method: "put"


router.put('/add/:bookmark_id/:tag_id',async (req,res)=>{
    try {
        const bookmark= await Bookmark.findById(req.params.bookmark_id);
        

        if(!bookmark){
            return res.status(400).json({msg:'Inavalid credentials'});
        }

        if(bookmark.Tags.filter(Taged=> Taged.Tag.toString() === req.params.tag_id ).length > 0) {
            return res.status(400).json({msg:'already tagged'});
        }
        

        const tagb={
            Tag:req.params.tag_id
        }

        bookmark.Tags.unshift(tagb)

        await bookmark.save();
        res.json(bookmark)

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('server error')
    }
})


// delte a tag from particaular bookmark
// @routes: "/delete/:bookmark_id/:tag_id"
// Method: "delete"



router.delete('/delete/:bookmark_id/:tag_id', async (req,res)=>{
    try {

        const bookmark =await Bookmark.findById(req.params.bookmark_id);

        //pull a tag 
        const tag =bookmark.Tags.find(Tagid => Tagid.Tag.toString() === req.params.tag_id)

        if(!tag){
            return res.status(404).json({msg:"tag does not exit"})
        }


        

        
        const removeIndex =bookmark.Tags.map(Tagid=>Tagid.Tag.toString()).indexOf(req.params.tag_id);

        bookmark.Tags.splice(removeIndex,1);

        await bookmark.save();

        res.json(bookmark.Tags);
        


        
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('server error')
    }
})



// get all the bookmarks
// @routes: "/bookmark
// Method: "get"


router.get('/bookmark',async(req,res)=>{

    try {
        const bookmark = await Bookmark.find().sort({data:-1})

        

        if(!bookmark){
            return res.status(404).json({msg:"bookmarms does not exist"})
        }

        res.json(bookmark)
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('server error')
    }
    
    

    
});

router.get('/tag',async(req,res)=>{

    try {
        const tag = await Tag.find().sort({data:-1})

        

        if(!tag){
            return res.status(404).json({msg:"bookmarms does not exist"})
        }

        res.json(tag)
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('server error')
    }
    
    

    
});





module.exports = router;