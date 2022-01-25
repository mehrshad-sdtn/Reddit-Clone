const mongoose = require('mongoose');
Schema = mongoose.Schema

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    _creator : { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true},
    description: { type: String, required: true},
    likes: Number,
    disliked: Number,
    comments    : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    community : { type: Schema.Types.ObjectId, ref: 'Community' },

},{timestamps: true });


module.exports = mongoose.model('Post', postSchema);