const db = require('../models')
const Wards = db.wards
const Op = db.Sequelize.Op
const serverPage = require('./page')

// ----------------------------------CREATE WRADS----------------------------------
exports.create = (req, res) => {
  if (!req.body.district_id || req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const wards = {
    name: req.body.name,
    district_id: req.body.district_id,
    idname: req.body.idname,
  }
  Wards.create(wards)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Wards.',
      })
    })
}

// ----------------------------------FIND ALL WRADS----------------------------------
exports.findAll = (req, res) => {
  const district_id = req.query.district_id
  var condition = district_id
    ? { district_id: { [Op.like]: `%${district_id}` } }
    : null
  Wards.findAndCountAll({ where: condition })
    .then((data) => {
      const response = serverPage.getPagingData(data)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Wards.',
      })
    })
}

// ----------------------------------FIND BY ID WRADS----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Wards.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Wards with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Wards with id=' + id,
      })
    })
}

// ----------------------------------UPDATE WRADS----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Wards.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Wards was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Wards with id=${id}. Maybe Wards was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Wards with id=' + id,
      })
    })
}

// ----------------------------------DELETE WRADS----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Wards.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Wards was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Wards with id=${id}. Maybe Wards was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Wards with id=' + id,
      })
    })
}
