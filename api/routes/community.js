const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const url = require("url")
const bodyParser = require("body-parser");

const router = express.Router();
const Community = require('../models/community');
const user_checkauth = require('../middleware/user-check');
const req = require('express/lib/request');



router.get( "/" ,  (req, res, next) => {
    const sort_key = url.parse(req.url,true).query.sort;
    console.log(sort_key)
    Community.find().sort(sort_key)
    .exec() 
    .then( docs => {
        //console.log(docs);
        if(docs.length>0){
            return res.status(200).json(docs)
        }else{
            return res.status(404).json("no entries found")
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            message: err.message,
            error: err
        });
    });
})


router.post('/'  ,(req, res, next) => {
  
    const c = new Community({
    _id:  new mongoose.Types.ObjectId(),
    //_creator : req.body.username, //Todo user id ????
    title: req.body.title,
    description: req.body.description,
    likes: 0,
    disliked: 0,
    posts    : [],
    members    : [],
    admins    : [],
    blacklist    : []
    })
    c
    .save()
    .then(result => {
        console.log(result)
        return res.status(201).json({
            messege: 'Handle POST req to /communities',
           // _creator : req.body.username, //Todo user id ????
            title: req.body.title,
            description: req.body.description,
            likes: 0,
            disliked: 0,
            posts    : [],
            members    : [],
            admins    : [],
            blacklist    : []
     
        })
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({
            message: err.message,
            error: err
        });
    });
});

router.get("/:cName", (req, res, next) => {
    const name = req.params.cName
    Community.findOne({name: name})
    .exec() 
    .then( doc => {
        console.log(doc);
        if(doc){
            return res.status(200).json({doc})
        }else{
            return res.status(404).json("no valid entry found for provided Name")
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            message: "an error occurred",
            error: err
        });
    });
})



router.put("/:cName",(req, res, next) => {

    const name = req.params.cName
    const c = Community.findOne({title: name})
    Community.updateOne(c,{
        admins: c[admins].push(req.body.admin) //to add admins by user id
        //bl list
        
    })
    .exec() 
    .then( result => {
        mc = result.matchedCount;
        console.log(result);
        if(mc>0){
          return  res.status(200).json({
                message:"successfully changed"
            })
       }else{
         return res.status(404).json({
            message:"no valid entry found for provided Name"
        })
       }
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            message: "an error occurred",
            error: err
        });
    });
})






module.exports = router;