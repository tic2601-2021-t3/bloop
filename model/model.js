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
  
userSchema.pre('save', function (next) {
  const user = this;

  // Only hash password if it's new or modified
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});
  
  userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return callback(err);
      }
  
      callback(null, isMatch);
    });
  };
  
const Data = mongoose.model('Data', dataSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Data, User }; //module.exports = mongoose.model('Data', dataSchema)