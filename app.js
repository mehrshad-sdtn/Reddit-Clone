const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const app = express();
const url = require("url");
const community = require('./api/models/community');


mongoose.connect('mongodb+srv://node-reddit:'
+ process.env.MONGO_ATLAS_PW
+'@node-reddit.sfkhj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
)



.then(()=>console.log('db connected'))
.catch( err => console.log(err))


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


UserRoutes = require("./api/routes/user")
CommunityRoutes = require("./api/routes/community")
PostRoutes = require("./api/routes/post")
CommentRoutes = require("./api/routes/comment")


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });


app.use('/user',UserRoutes)
app.use('/communities',CommunityRoutes)
app.use('/post',PostRoutes)
app.use('/comments',CommentRoutes)


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

module.exports = app;