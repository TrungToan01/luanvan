const db = require('../models')
const User_address = db.user_address
const Op = db.Sequelize.Op

// ----------------------------------CREATE USER ADDRESS----------------------------------
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  req.body && req.body.is_default ? req.body.is_default : true

  User_address.create(req.body)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the user address.',
      })
    })
}

// ----------------------------------FIND ALL USER ADDRESS----------------------------------
exports.findAll = (req, res) => {
  User_address.findAll()
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving user address.',
      })
    })
}
// ----------------------------------FIND BY ID USER ADDRESS----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  User_address.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find user address with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user address with id=' + id,
      })
    })
}

// ----------------------------------UPDATE USER ADDRESS----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  User_address.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User address was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update user address with id=${id}. Maybe user address was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating user address with id=' + id,
      })
    })
}

// ----------------------------------DELETE USER ADDRESS----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  User_address.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User address was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete user address with id=${id}. Maybe user address was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete user address with id=' + id,
      })
    })
}
