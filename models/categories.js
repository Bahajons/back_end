const Joi = require('joi');
const mongoose = require('mongoose')





const Categories = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
})

const Category = mongoose.model("Category", Categories);


function validateCategory(category) {

    let schema = Joi.object({
        name: Joi.string().min(3)
    })

    console.log(schema.validate({ name: category }))
    return schema.validate({ name: category });
}


exports.Categories = Category;
exports.categorySchema=Categories;
exports.validateCategory = validateCategory;