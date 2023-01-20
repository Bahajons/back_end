const express = require('express');
const Joi = require('joi');
const router = express.Router()
const mongoose = require('mongoose')
const { Custumers, validateCategory } = require('../models/custumers')


router.get('/', async (req, res) => {
    const custumers = await Custumers.find().sort('name')
    res.send(custumers)
})

router.get('/:id', async (req, res) => {
    let custumers = await Custumers.findById(req.params.id);
    if (!custumers)
        res.status(404).send('Berilgan id  so\'rovdagi kitob topilmadi')

    res.send(custumers)
})
router.post('/', async (req, res) => {
    const { error } = validateCategory(req.body);

    if (error)
        return res.status(400).send(error.details);

    let custumer = new Custumers({
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone
    })

    custumer = await custumer.save();
    res.status(201).send(custumer)
})

router.put('/:id', async (req, res) => {
    const { error } = validateCategory(req.body);
    if (error) {
        return res.status(400).send(error)
    }

    let custumer = await Custumers.findByIdAndUpdate(req.params.id, { name: req.body.name, isVip: req.body.isVip, phone: req.body.phone }, { new: true });

    if (!custumer) {
        return res.status(400).send('Berilgan IDga teng bo\'lgan toifa topilmadi')
    }
    res.send(custumer)
})

router.delete('/:id', async (req, res) => {
    let custumer = await Custumers.findByIdAndRemove(req.params.id)
    if (!custumer) {
        return res.status(404).send('Berilgan ID ga teng bo\'lgan toifa topilmadi')
    }
    res.send(custumer)
})




module.exports = router;