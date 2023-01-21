const express = require('express');
const Joi = require('joi');
const router = express.Router()
const mongoose = require('mongoose')
const { Categories, validateCategory } = require('../models/categories')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/', async (req, res) => {
  const categories = await Categories.find().sort('name')
  res.send(categories)
})

router.get('/:id', async (req, res) => {
  let category = await Categories.findById(req.params.id);
  if (!category)
    res.status(404).send('Berilgan id  so\'rovdagi kitob topilmadi')

  res.send(category)
})
router.post('/', auth, async (req, res) => {
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(401).send('Token mavjud emas shu saba rad etildi')
  }
  const { error } = validateCategory(req.body.name);
  if (error)
    return res.status(400).send(error.details);

  let category = new Categories({
    name: req.body.name
  })

  category = await category.save();
  res.status(201).send(category)
})

router.put('/:id', auth, async (req, res) => {
  const { error } = validateCategory(req.body.name);
  if (error) {
    return res.status(400).send(error)
  }

  let category = await Categories.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

  if (!category) {
    return res.status(400).send('Berilgan IDga teng bo\'lgan toifa topilmadi')
  }
  res.send(category)
})

router.delete('/:id', [auth, admin], async (req, res) => {
  let category = await Categories.findByIdAndRemove(req.params.id)
  if (!category) {
    return res.status(404).send('Berilgan ID ga teng bo\'lgan toifa topilmadi')
  }
  res.send(category)
})




module.exports = router;