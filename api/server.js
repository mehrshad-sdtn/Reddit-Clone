import express from 'express';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "./models/User.js";
import Comment from "./models/Comment.js";
import VotingRoutes from "./VotingRoutes.js";
import e from 'express';

const secret = 'secret123';
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(VotingRoutes);

function getUserFromToken(token) {
  const userInfo = jwt.verify(token, secret);
  return User.findById(userInfo.id);
}


await mongoose.connect('mongodb+srv://node-reddit:node-reddit@node-reddit.sfkhj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{useNewUrlParser:true,useUnifiedTopology:true,})
.then( res => {console.log('connected to DB');
}).catch( e=>{
  console.log(e)
})

const db = mongoose.connection;
db.on('error', console.log);

app.get('/', (req, res) => {
  res.send('ok');
});

app.post('/register', (req, res) => {
  const {email,username} = req.body;

  if(req.body.password.length < 8){
    return res.status(422).json({
      message:'Password must be more than 8 letter'
    });
  }
  const password = bcrypt.hashSync(req.body.password, 10);
  const user = new User({email,username,password});
  user.save().then(user => {
    jwt.sign({id:user._id}, secret, (err, token) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(201).cookie('token', token).send();
      }
    });
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({
        message: err.message
    })
})
});

app.get('/user', (req, res) => {
  const token = req.cookies.token;

  getUserFromToken(token)
    .then(user => {
      res.json({username:user.username});
    })
    .catch(err =>{
      console.log(err)
      res.status(500).json({
          message: err.message
      })
  })

});

app.post('/login', (req, res) => {
  const {username, password} = req.body;

  User.findOne({username})
  .then(user => {
    if (user && user.username) {
      const passOk = bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign({id:user._id}, secret, (err, token) => {
          res.cookie('token', token).send();
        });
      } else {
        return res.status(422).json({
          message:'Invalid username or password'
        });
      }
    } else {
      return res.status(422).json({
        message:'Invalid username or password'
      })
    }
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({
        message: err.message
    })
})
});

app.post('/logout', (req, res) => {
  res.cookie('token', '')
  .send();
});

app.get('/comments', (req, res) => {
  Comment.find({rootId:null})
  
  .sort({postedAt: -1})
  .then(comments => {
    res.json(comments);
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({
        message: err.message
    })
})
});

app.get('/comments/root/:rootId', (req, res) => {
  Comment.find({rootId:req.params.rootId})
  .sort({postedAt: -1})
  .then(comments => {
    res.json(comments);
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({
        message: err.message
    })
})
});

app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id)
  .then(comment => {
    res.json(comment);
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({
        message: err.message
    })
})
});

app.post('/comments', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.sendStatus(401);
    return;
  }
  getUserFromToken(token)
    .then(userInfo => {
      const {title,body,parentId,rootId} = req.body;
      const comment = new Comment({
        title,
        body,
        author:userInfo.username,
        postedAt:new Date(),
        parentId,
        rootId,
      });
      comment.save().then(savedComment => {
        res.json(savedComment);
      }).catch(console.log);
    })
    .catch(err =>{
      console.log(err)
      res.status(500).json({
          message: err.message
      })
  })
});

app.listen(4000);