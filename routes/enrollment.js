const express = require('express');
const Joi = require('joi');
const router = express.Router()
const mongoose = require('mongoose');
const { Categories } = require('../models/categories');
const { Course, validateCourse } = require('../models/course');
const { Custumers } = require('../models/custumers');

const { Enrollments, validateEnrollment } = require('../models/enrollment')



router.get('/', async (req, res) => {
    const enrollment = await Enrollments.find().sort('-dateStart')
    res.send(enrollment)
})

router.get('/:id', async (req, res) => {
    let course = await Enrollments.findById(req.params.id);
    if (!course)
        res.status(404).send('Berilgan id  so\'rovdagi kitob topilmadi')

    res.send(course)
})
router.post('/', async (req, res) => {
    const { error } = validateEnrollment(req.body);
    if (error)
        return res.status(400).send(error.details);
    console.log('==>', req.body)
    const customer = await Custumers.findById(req.body.customerId)
    if (!customer) {
        return res.status(400).send('Berilgan customer_Id ga teng topilmadi')
    }
    const course = await Course.findById(req.body.courseId)
    if (!course) {
        return res.status(400).send('Berilgan course_Id ga teng topilmadi')
    }
    let enrollment = new Enrollments({
        customer: {
            _id: customer._id,
            name: customer.name
        },
        course: {
            _id: course._id,
            title: course.title
        }
    })
    console.log("==>>", customer, course)
    // if (customer.isVip)
    //     enrollment.courseFee = courseFee - (0.2 * courseFee);


    enrollment = await enrollment.save();
    res.status(201).send(enrollment)
})

router.put('/:id', async (req, res) => {
    const { error } = validateCourse(req.body);
    console.log("==>", req.body)
    if (error) {
        return res.status(400).send(error)
    }

    let course = await Course.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            category: {
                name: req.body.category.name
            },
            trainer: req.body.trainer,
            tags: req.body.tags,
            status: req.body.status
        },
        {
            new: true
        });

    if (!course) {
        return res.status(400).send('Berilgan IDga teng bo\'lgan toifa topilmadi')
    }
    res.send(course)
})

router.delete('/:id', async (req, res) => {
    let course = await Course.findByIdAndRemove(req.params.id)
    if (!course) {
        return res.status(404).send('Berilgan ID ga teng bo\'lgan toifa topilmadi')
    }
    res.send(course)
})



module.exports = router;