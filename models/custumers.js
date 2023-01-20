const Joi = require('joi');
const mongoose = require('mongoose')

const Custumer = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isVip: {
    type: Boolean,
    required: false,
    default: false,
  },
  phone: {
    type: Number,
    minlength: 7,
    maxlength: 15,
    required: true
  }
})

const Custumers = mongoose.model("Custumer", Custumer);

function validateCategory(category) {
  let schema = Joi.object({
    name: Joi.string().min(3).required(),
    isVip: Joi.boolean(),
    phone: Joi.string().min(5).max(50).required()
  })
  console.log(schema.validate(category))
  return schema.validate(category);
}


exports.schemaCustomer=Custumer
exports.Custumers = Custumers;
exports.validateCategory = validateCategory;
