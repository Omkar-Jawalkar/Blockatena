const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    walletAddress: {type: String, required: true, unique: true},
    email:{type: String, required: true, unique: true},
    discord: {type: String, unique: true},
});

const model = mongoose.model('User', User);
module.exports = model;