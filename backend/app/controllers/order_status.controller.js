const db = require('../models')
const Order_status = db.order_status
const serverPage = require('./page')

// ----------------------------------CREATE ORDER STATUS----------------------------------
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }
  Order_status.create(req.body)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Order_status.',
      })
    })
}

// ----------------------------------FIND ALL ORDER STATUS----------------------------------
exports.findAll = (req, res) => {
  Order_status.findAndCountAll({ where: nulL })
    .then((data) => {
      const response = serverPage.getPagingData(data)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Order_status .',
      })
    })
}

// ----------------------------------FIND BY ID----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Order_status.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find Order_status with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Order_status with id=' + id,
      })
    })
}

// ----------------------------------UPDATE ORDER STATUS----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Order_status.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Order_status was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Order_status with id=${id}. Maybe Order_detail was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Order_status with id=' + id,
      })
    })
}
// ----------------------------------DELETE ORDER STATUS----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Order_status.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Order_status was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Order_status with id=${id}. Maybe Order_status was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Order_status with id=' + id,
      })
    })
}
