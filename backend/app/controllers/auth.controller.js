const db = require('../models')
const User = db.user
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const Role = db.user_role
dotenv.config()

// ----------------------------------REGISTRATION----------------------------------
exports.register = async (req, res) => {
  // check email
  const email = req.body.email
  const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!emailFormat.test(email)) {
    return res.send('Invalid email')
  }
  const checkEmail = await User.findOne({ where: { email: email } })
  if (checkEmail) {
    return res.status(409).send('account is already.')
  }

  //check phone number
  const phone = req.body.phone
  const phoneFormat = /^([0-9\(\)\/\+ \-]*)$/
  if (!phoneFormat.test(phone)) {
    return res.send('Invalid phone')
  }
  const checkPhone = await User.findOne({ where: { phone: phone } })
  if (checkPhone) {
    return res.status(409).send('Your phone is already.')
  }

  //handle data
  const hashPassword = bcrypt.hashSync(req.body.password, 10)
  const id = req.body.userRoleId ? req.body.userRoleId : 3
  const userRole = await Role.findOne({ where: { id: id } })
  const user = {
    full_name: req.body.full_name,
    birth_date: req.body.birth_date,
    gender: req.body.gender ? req.body.gender : true,
    phone: req?.body?.phone,
    email: req.body.email,
    password: hashPassword,
    avatar: req?.file?.filename
      ? 'avatars/' + req?.file?.filename
      : '/avatars/default_avatar.png',
    userRoleId: id,
    rolename: userRole.role_name,
  }
  User.create(user)
    .then((datas) => {
      var token = jwt.sign(
        { email: req.body.email, password: req.body.password },
        process.env.JWT_KEY,
        {
          expiresIn: '24h',
        },
      )
      var data = {
        username: datas.full_name,
        birth_date: datas.birth_date,
        gender: datas.gender,
        phone: datas.phone,
        email: datas.email,
        avatar: datas?.avatar,
        rolename: datas?.rolename,
      }
      var userRoleId = datas.userRoleId
      return res
        .status(200)
        .json({ message: 'login is success.', data, userRoleId, token })
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the user.',
      })
    })
}

// ----------------------------------LOGIN----------------------------------
exports.login = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      return res.status(401).send('User does not exist.')
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).send('Password is wrong.')
    } else {
      if (user) {
        var token = jwt.sign(
          { email: email, password: password },
          process.env.JWT_KEY,
          {
            expiresIn: '24h',
          },
        )
        var role = user.userRoleId
        var data = {
          username: user.full_name,
          birth_date: user.birth_date,
          gender: user.gender,
          phone: user.phone,
          email: user.email,
          avatar: user.avatar,
          rolename: user.rolename,
        }

        return res
          .status(200)
          .json({ message: 'login is success.', data, role, token })
      } else {
        return res.status(200).json('account does not exist.')
      }
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
}
