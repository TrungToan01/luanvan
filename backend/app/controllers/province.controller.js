const db = require('../models')
const Province = db.province
const serverPage = require('./page')

// ----------------------------------CREATE PROVINCE----------------------------------
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const province = {
    name: req.body.name,
  }
  Province.create(province)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Province.',
      })
    })
}

// ----------------------------------FIND ALL PROVINCE----------------------------------
exports.findAll = (req, res) => {
  const page = req?.body?.page
  const size = req?.body?.size
  const { limit, offset } = serverPage.getPagination(page, size)
  Province.findAndCountAll({ where: null, limit, offset })
    .then((data) => {
      const response = serverPage.getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Province .',
      })
    })
}

// ----------------------------------FIND BY ID COUPON----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Province.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find Province with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Province with id=' + id,
      })
    })
}

// ----------------------------------UPDATE COUPON----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Province.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Province was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Province with id=${id}. Maybe Province was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Province with id=' + id,
      })
    })
}

// ----------------------------------DELETE COUPON----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Province.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Province was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Province with id=${id}. Maybe Province was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Province with id=' + id,
      })
    })
}
