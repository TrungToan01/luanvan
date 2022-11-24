const db = require('../models')
const Coupons = db.coupons
const serverPage = require('./page')

// ----------------------------------FIND ALL COUPON----------------------------------
exports.create = (req, res) => {
  if (
    !req.body.code ||
    !req.body.start_date ||
    !req.body.end_date ||
    req.body.quantity <= 0 ||
    !req.body.discount_value
  ) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }
  Coupons.create(req.body)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Coupons.',
      })
    })
}

// ----------------------------------FIND ALL COUPON----------------------------------
exports.findAll = (req, res) => {
  const page = req?.body?.page
  const size = req?.body?.size
  const { limit, offset } = serverPage.getPagination(page, size)
  Coupons.findAndCountAll({ where: null, limit, offset })
    .then((data) => {
      const response = serverPage.getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Coupons .',
      })
    })
}

// ----------------------------------FIND BY ID COUPON----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Coupons.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find Coupons with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Coupons with id=' + id,
      })
    })
}

// ----------------------------------UPDATE COUPON----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Coupons.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Coupons was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Coupons with id=${id}. Maybe Coupons was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Coupons with id=' + id,
      })
    })
}

// ----------------------------------DELETEL COUPON----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Coupons.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Coupons was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Coupons with id=${id}. Maybe Coupons was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Coupons with id=' + id,
      })
    })
}
