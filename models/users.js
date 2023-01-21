const Joi = require('joi');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

const schemaUsers = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
})

schemaUsers.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'))
  return token
}

const Users = mongoose.model("User", schemaUsers)


function validateUsers(user) {

  let schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().min(3).max(35).required(),
    password: Joi.string().min(5).required(),
    isAdmin: Joi.boolean().required()
  })
  return schema.validate(user);
}




exports.Users = Users
exports.validateUsers = validateUsers