import mongoose from "mongoose";

const schema = new mongoose.Schema({
  author: {type:String,required:true},
  title: {type:String,required:true},
  body: {type:String,required:true},
  postedAt: {type:Date,required:true},
  parentId: {type:mongoose.ObjectId,required:false},
  rootId: {type:mongoose.ObjectId,required:false},
});
const Comment = mongoose.model('Comment', schema);

export default Comment;