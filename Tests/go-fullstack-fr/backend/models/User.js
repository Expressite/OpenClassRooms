const mongoose = require('mongoose');
//mongoose plugin for unique validation
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//add plugin to userSchema
userSchema.plugin(uniqueValidator);

//export user model
module.exports = mongoose.model('User', userSchema);