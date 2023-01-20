const express = require('express');
const Joi = require('joi');
const router = express.Router()
const mongoose = require('mongoose')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { Users } = require("../models/users")
const jwt = require('jsonwebtoken')
const config = require('config')


router.post('/', async (req, res) => {
  const { error } = validateUsers(req.body);

  if (error)
    return res.status(400).send(error.details);

  let user = await Users.findOne({ email: req.body.email })
  if (!user)
    return res.send('Berilgan email topilmadi')

  const isValidPassword = await bcrypt.compare(req.body.password, user.password)
  if (!isValidPassword)
    return res.send('Email yoki parol xato')

  const { name, email } = user
  const token = user.generateAuthToken();


  res.header('x-auth-token', token).send({ name, email })
})


function validateUsers(user) {

  let schema = Joi.object({
    email: Joi.string().min(3).max(35).required(),
    password: Joi.string().min(5).required()
  })
  return schema.validate(user);
}
module.exports = router;