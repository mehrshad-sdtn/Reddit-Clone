const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const url = require("url")
const bodyParser = require("body-parser");

const router = express.Router();
const User = require('../models/user');
const user_checkauth = require('../middleware/user-check')


router.post('/login' , (req, res, next)=>{
    User.find({ username: req.body.username})
    .exec()
    .then(user =>{
        if(user.length < 1){
            return res.status(401).json({
                message: "Username does not exist"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(!result){
                return res.status(401).json({
                message: "Incorrect Password"
            })
        }else{
               const token = jwt.sign(
                {
                    email: user[0].email,
                    userId: user[0]._id
                },
                process.env.JWT_KEY, 
                {
                expiresIn: "1h"
                });

                return res.status(200).json({
                    message: "Auth successful",
                    token: token
                })
            }

        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    })
})

router.post('/signup', (req, res, next)=>{
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }else{
            const a = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                email: req.body.email,
                password: hash // to be more secure
            })
            a
            .save()
            .then( result => {
                return res.status(201).json({
                    message: 'User created'
                })
            })
            .catch( err => {
                console.log(err)
                return res.status(500).json({
                    message: err.message
                })
                
            })
        }
    })  
})


router.get( "/" ,  (req, res, next) => { 
    console.log("+++++++++++++++++++++++++++++++++++++++")
   const sort_key = url.parse(req.url,true).query.sort;
   //const sort_key = "username"
    console.log(sort_key)
    User.find().sort(sort_key)
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


router.get("/:uName", (req, res, next) => {
    const uname = req.params.uName
    User.findOne({username: uname})
    .exec() 
    .then( doc => {
        console.log(doc);
        if(doc){
            return res.status(200).json({doc})
        }else{
            return res.status(404).json("no valid entry found for provided Username")
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



router.put("/", user_checkauth,(req, res, next) => {

    User.find({ username: req.body.username})
    .exec()
    .then(user =>{
        if(user.length < 1){
            return res.status(401).json({
                message: "Username does not exist"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(!result){
                return res.status(401).json({
                message: "Incorrect Password"
            })
        }else{
                
            User.updateOne({ username: req.body.username},
            {
                email: req.body.email
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
               
        }})})
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    })
    
})





module.exports = router;