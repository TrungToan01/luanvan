const db = require('../models')
const User = db.user
const Role = db.user_role
const Op = db.Sequelize.Op
const bcrypt = require('bcryptjs')
const serverPage = require('./page')

// ----------------------------------CREATE USER----------------------------------
exports.create = async (req, res) => {
  console.log(req)
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.phone ||
    !req.body.userRoleId
  ) {
    return res.send('content is invalid')
  }
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
  const role = await Role.findOne({ where: { id: id } })

  console.log(req.body)
  //console.log(req.file)
  const user = {
    full_name: req.body.full_name,
    birth_date: req?.body?.birth_date || '01/01/1975',
    gender: req.body.gender ? req.body.gender : true,
    phone: req?.body?.phone,
    email: req.body.email,
    password: hashPassword,
    avatar: req?.file?.filename
      ? 'avatars/' + req?.file?.filename
      : '/avatars/default_avatar.png',
    userRoleId: id,
    rolename: role.role_name,
  }

  User.create(user)
    .then((response) => {
      const data = {
        id: response.id,
        full_name: response.full_name,
        gender: response.gender,
        phone: response.phone,
        email: response.email,
        avatar: response.avatar,
        userRoleId: response.userRoleId,
        rolename: response.rolename,
      }

      return res.send(data)
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the user.',
      })
    })
}

// ----------------------------------FIND ALL USER----------------------------------
exports.findAll = (req, res) => {
  const page = req.query.page
  const size = req?.query?.size
  const user = {
    full_name: req.query.full_name,
    birth_date: req.query.birth_date,
    gender: req.query.gender,
    phone: req.query.phone,
    email: req.query.email,
    userRoleId: req.query.userRoleId,
  }
  var condition
  if (user.email) {
    condition = { email: { [Op.like]: `%${user.email}%` } }
  } else {
    if (user.full_name) {
      condition = { full_name: { [Op.like]: `%${user.full_name}` } }
    } else {
      if (user.birth_date) {
        condition = { birth_date: { [Op.like]: `%${user.birth_date}` } }
      } else {
        if (user.phone) {
          condition = { phone: { [Op.like]: `%${user.phone}` } }
        } else {
          if (user.gender) {
            condition = { gender: { [Op.like]: `%${user.gender}` } }
          } else {
            if (user.userRoleId) {
              condition = { userRoleId: { [Op.like]: `%${user.userRoleId}` } }
            } else {
              condition = null
            }
          }
        }
      }
    }
  }

  const { limit, offset } = serverPage.getPagination(page, size)

  User.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = serverPage.getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving user.',
      })
    })
}

// ----------------------------------FIND BY ID USER----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  User.findByPk(id)
    .then((response) => {
      if (response) {
        const data = {
          id: response.id,
          full_name: response.full_name,
          gender: response.gender,
          birthdate: response.birth_date,
          phone: response.phone,
          email: response.email,
          avatar: response.avatar,
          userRoleId: response.userRoleId,
          rolename: response?.rolename,
        }

        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      })
    })
}

// ----------------------------------UPDATE USER----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  if (req.file) {
    req.body.avatar = 'avatars/' + req.file.filename
  }
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating User with id=' + id,
      })
    })
}

// ----------------------------------DELETE USER----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id,
      })
    })
}
