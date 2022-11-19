const db = require('../models')
const District = db.district
const Op = db.Sequelize.Op
const serverPage = require('./page')

// ----------------------------------CREATE DISTRICT----------------------------------
exports.create = (req, res) => {
  if (!req.body.name || !req.body.province_id) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const district = {
    name: req.body.name,
    province_id: req.body.province_id,
    idname: req.body.idname,
  }
  District.create(district)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the District.',
      })
    })
}

// ----------------------------------FIND ALL DISTRICT----------------------------------
exports.findAll = (req, res) => {
  const province_id = req?.query?.province_id
  var condition = province_id
    ? { province_id: { [Op.like]: `%${province_id}%` } }
    : null
  District.findAndCountAll({ where: condition })
    .then((data) => {
      const response = serverPage.getPagingData(data)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving District .',
      })
    })
}

// ----------------------------------FIND DISTRICT BY ID----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  District.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find District with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving District with id=' + id,
      })
    })
}

// ----------------------------------UPDATE COUPON----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  District.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'District was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update District with id=${id}. Maybe District was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating District with id=' + id,
      })
    })
}

// ----------------------------------DELETE COUPON----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  District.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'District was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete District with id=${id}. Maybe District was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete District with id=' + id,
      })
    })
}
