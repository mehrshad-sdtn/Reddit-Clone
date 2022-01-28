import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: {
    type:String,
    required:true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  username: {type:String,required:true,},
  password: {type:String,required:true},
});
const User = mongoose.model('User', schema);

export default User;