const db = require('../models')
const Order_tracking = db.order_tracking
const serverPage = require('./page')

// ----------------------------------CREATE ORDER TRACKING----------------------------------
exports.create = (req, res) => {
  if (!req.body.statusId || !req.body.orderId || !req.body.userId) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const order_tracking = {
    statusId: req.body.status,
    orderId: req.body.orderId,
    userId: req.body.userId,
  }
  Order_tracking.create(order_tracking)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating the Order_tracking.',
      })
    })
}

// ----------------------------------FIND ALL ORDER TRACKING----------------------------------
exports.findAll = (req, res) => {
  Order_tracking.findAndCountAll({ where: null })
    .then((data) => {
      const response = serverPage.getPagingData(data)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving Order_tracking .',
      })
    })
}

// ----------------------------------FIND BY ID ORDER TRACKING----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Order_tracking.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find Order_tracking with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Order_tracking with id=' + id,
      })
    })
}

// ----------------------------------UPDATE ORDER DETAIL----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Order_tracking.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Order_tracking was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Order_tracking with id=${id}. Maybe Order_tracking was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Order_tracking with id=' + id,
      })
    })
}

// ----------------------------------DELETE ORDER DETAIL----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Order_tracking.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Order_tracking was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Order_tracking with id=${id}. Maybe Order_tracking was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Order_tracking with id=' + id,
      })
    })
}
