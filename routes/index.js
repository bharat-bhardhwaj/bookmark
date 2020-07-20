const express=require('express')

const router =express.Router()


router.get('/',(req,res)=>{
    res.send("first rendering")
})


module.exports = router;