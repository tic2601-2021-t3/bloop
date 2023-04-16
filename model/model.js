const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const dataSchema = new mongoose.Schema({
    food: {
        required: true,
        type: String
    },
    qty: {
        required: true,
        type: Number
    }
})

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: String, enum: ['user', 'admin'], default: 'user' }]
});

const Data = mongoose.model('Data', dataSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Data, User }; 

/**
 * Key Learnings:
 * model.js exports two models named Data and User
 * When importing the models, take note to import them in their correct order
 * For example, routes.js imports the models from model.js like so:
 * const { Data, User } = require('../model/model'); 
 * Note that Date was imported first then User
 * */