const db = require('../models')
const Ram = db.ram_option
const serverPage = require('./page')

// ----------------------------------CREATE Ram----------------------------------
exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  const ram = {
    name: req.body.name,
  }
  Ram.create(ram)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Ram.',
      })
    })
}

// ----------------------------------FIND ALL Ram----------------------------------
exports.findAll = (req, res) => {
  Ram.findAndCountAll({ where: null })
    .then((data) => {
      const response = serverPage.getPagingData(data)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Ram .',
      })
    })
}

// ----------------------------------FIND BY ID Ram----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Ram.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find Ram with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Ram with id=' + id,
      })
    })
}

// ----------------------------------UPDATE Ram----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Ram.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Ram was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Ram with id=${id}. Maybe Ram was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Ram with id=' + id,
      })
    })
}

// ----------------------------------DELETE Ram----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Ram.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Ram was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Ram with id=${id}. Maybe Ram was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Ram with id=' + id,
      })
    })
}
