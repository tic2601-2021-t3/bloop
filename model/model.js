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