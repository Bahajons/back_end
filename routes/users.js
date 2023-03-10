const express = require('express');
const Joi = require('joi');
const router = express.Router()
const mongoose = require('mongoose')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { Users, validateUsers } = require("../models/users");
const auth = require('../middleware/auth');



router.get('/me', auth, async (req, res) => {
  const user = await Users.findById(req.user._id).select('-password')
  res.send(user)
})




router.post('/', async (req, res) => {
  const { error } = validateUsers(req.body);

  if (error)
    return res.status(400).send(error.details);

  let checkemail = await Users.findOne({ email: req.body.email })
  if (checkemail) {
    return res.status(400).send('Email allaqachon foydalanilgan')
  }

  let user = new Users(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']))
  const salt = await bcrypt.genSalt()
  user.password = await bcrypt.hash(user.password, salt)

  user = await user.save();
  res.status(201).send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']))
})
module.exports = router;