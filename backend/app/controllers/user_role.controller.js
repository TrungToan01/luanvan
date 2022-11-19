const db = require('../models')
const User_role = db.user_role
const Op = db.Sequelize.Op

// ----------------------------------CREATE ROLE----------------------------------
exports.create = (req, res) => {
  if (!req.body.role) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const user_role = {
    role: req.body.role,
  }
  User_role.create(user_role)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the user_role.',
      })
    })
}

// ----------------------------------FIND ALL ROLE----------------------------------
exports.findAll = (req, res) => {
  User_role.findAll()
    .then((data) => {
      return res.status(200).json({ data })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving user_role.',
      })
    })
}
// ----------------------------------FIND BY ID ROLE----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  User_role.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find User_role with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving User_role with id=' + id,
      })
    })
}

// ----------------------------------UPDATE ROLE----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  User_role.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User_role was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update User_role with id=${id}. Maybe User_role was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating User_role with id=' + id,
      })
    })
}

// ----------------------------------DELETE ROLE----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  User_role.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User_role was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete User_role with id=${id}. Maybe User_role was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete User_role with id=' + id,
      })
    })
}
