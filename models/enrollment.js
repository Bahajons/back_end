const Joi = require('joi');
const mongoose = require('mongoose')

const schemaEnrollment = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
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
    }),
    required: true,
  },
  course: {
    type: new mongoose.Schema({
      title: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 50
      },
      category: {
        type: new mongoose.Schema({
          name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
          },
        }),
        required: true
      },
      trainer: {
        type: String,
        required: true
      },
      tags: {
        type: [String]
      },
      status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true
      }
    }),
    required: true
  },
  dateStart: {
    type: Date,
    required: true,
    default: Date.now
  },
  courseFee: {
    type: Number,
    min: 0
  }
})

const Enrollments = mongoose.model("Enrollment", schemaEnrollment);

function validateEnrollment(enroll) {
  let schema = Joi.object({
    customerId: Joi.string().required(),
    courseId: Joi.string().required()
  })
  console.log(schema.validate(enroll))
  console.log(enroll)
  return schema.validate(enroll);
}

exports.Enrollments = Enrollments;
exports.validateEnrollment = validateEnrollment;
