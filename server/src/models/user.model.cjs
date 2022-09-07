const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        default: 'user'
    },
});

module.exports = mongoose.model('User', userSchema);