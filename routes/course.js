const express = require('express');
const Joi = require('joi');
const router = express.Router()
const mongoose = require('mongoose');
const { Categories } = require('../models/categories');
const { Course, validateCourse } = require('../models/course')


router.get('/', async (req, res) => {
  const course = await Course.find().sort('title')
  res.send(course)
})

router.get('/:id', async (req, res) => {
  let course = await Course.findById(req.params.id);
  if (!course)
    res.status(404).send('Berilgan id  so\'rovdagi kitob topilmadi')

  res.send(course)
})
router.post('/', async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error)
    return res.status(400).send(error.details);

  const category = await Categories.findById(req.body.categoryId)
  if (!category) {
    return res.status(400).send('Berilgan Id ga teng topilmadi')
  }

  let course = new Course({
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name
    },
    trainer: req.body.trainer,
    tags: req.body.tags,
    status: req.body.status
  })

  course = await course.save();
  res.status(201).send(course)
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