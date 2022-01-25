const mongoose = require('mongoose');
Schema = mongoose.Schema

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    _creator : { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true},
    description: { type: String, required: true},
    likes: Number,
    disliked: Number,
    replies    : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    post : { type: Schema.Types.ObjectId, ref: 'Post' },
    replyOn : { type: Schema.Types.ObjectId, ref: 'Comment' },


},{timestamps: true });


module.exports = mongoose.model('Comment', commentSchema);