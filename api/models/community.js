const mongoose = require('mongoose');
Schema = mongoose.Schema

const communitySchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    _creator : { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true},
    description: { type: String, required: true},
    likes: Number,
    disliked: Number,
    posts    : [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    members    : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    admins    : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    blacklist    : [{ type: Schema.Types.ObjectId, ref: 'User' }],
},{timestamps: true });


module.exports = mongoose.model('Community', communitySchema);