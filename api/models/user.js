const mongoose = require('mongoose');
Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: { type: String, required: true},
    posts    : [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments    : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    communities    : [{ type: Schema.Types.ObjectId, ref: 'Community' }]
},{timestamps: true })


module.exports = mongoose.model('User', userSchema);