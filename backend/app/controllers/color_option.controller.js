const db = require('../models')
const Color = db.color_option
const serverPage = require('./page')

// ----------------------------------CREATE COLOR----------------------------------
exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  const color = {
    name: req.body.name,
  }
  Color.create(color)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Color.',
      })
    })
}

// ----------------------------------FIND ALL COLOR----------------------------------
exports.findAll = (req, res) => {
  Color.findAndCountAll({ where: null })
    .then((data) => {
      const response = serverPage.getPagingData(data)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Color .',
      })
    })
}

// ----------------------------------FIND BY ID COLOR----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Color.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find Color with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Color with id=' + id,
      })
    })
}

// ----------------------------------UPDATE COLOR----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Color.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Color was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Color with id=${id}. Maybe Color was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Color with id=' + id,
      })
    })
}

// ----------------------------------DELETE COLOR----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Color.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Color was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Color with id=${id}. Maybe Color was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Color with id=' + id,
      })
    })
}
