const db = require('../models')
const Rom = db.rom_option
const serverPage = require('./page')

// ----------------------------------CREATE Rom----------------------------------
exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  Rom.create(req.body)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Rom.',
      })
    })
}

// ----------------------------------FIND ALL Rom----------------------------------
exports.findAll = (req, res) => {
  Rom.findAndCountAll({ where: null })
    .then((data) => {
      const response = serverPage.getPagingData(data)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Rom .',
      })
    })
}

// ----------------------------------FIND BY ID Rom----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Rom.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find Rom with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Rom with id=' + id,
      })
    })
}

// ----------------------------------UPDATE Rom----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Rom.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Rom was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Rom with id=${id}. Maybe Rom was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Rom with id=' + id,
      })
    })
}

// ----------------------------------DELETE Rom----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Rom.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Rom was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Rom with id=${id}. Maybe Rom was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Rom with id=' + id,
      })
    })
}
