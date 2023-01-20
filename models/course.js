const Joi = require('joi');
const mongoose = require('mongoose');
const { categorySchema } = require('./categories')

const schemaCourse = new mongoose.Schema({
    title: {
        type: String,
        // required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    category: {
        type: categorySchema,
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
})


const Course = mongoose.model('Course', schemaCourse)

function validateCourse(course) {
    let schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        categoryId: Joi.string().required(),
        trainer: Joi.string().required(),
        status: Joi.string().required(),
        tags: Joi.array().items(Joi.string())
    })
    console.log(schema.validate(course))
    return schema.validate(course);
}

exports.Course = Course;
exports.schemaCourse = schemaCourse;
exports.validateCourse = validateCourse;