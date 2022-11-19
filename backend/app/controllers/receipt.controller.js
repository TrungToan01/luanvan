const db = require('../models')
const Receipt = db.receipt
const Op = db.Sequelize.Op

// ----------------------------------CREATE RECEIPT----------------------------------
exports.create = (req, res) => {
  if (
    !req.body.supplierId ||
    !req.body.userId ||
    req.body.total_price <= 0 ||
    !req.body.total_price
  ) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const receipt = {
    supplierId: req.body.supplierId,
    userId: req.body.userId,
    total_price: req.body.total_price,
  }
  Receipt.create(receipt)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the receipt.',
      })
    })
}

// ----------------------------------FIND ALL RECEIPT----------------------------------
exports.findAll = (req, res) => {
  const supplierId = req.query.supplierId
  var condition = supplierId
    ? { supplierId: { [Op.like]: `%${supplierId}%` } }
    : null
  Receipt.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Receipt.',
      })
    })
}

// ----------------------------------FIND BY ID RECEIPT----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Receipt.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Receipt with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Receipt with id=' + id,
      })
    })
}

// ----------------------------------UPDATE RECEIPT----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Receipt.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Receipt was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Receipt with id=${id}. Maybe Receipt was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Receipt with id=' + id,
      })
    })
}

// ----------------------------------DELETE RECEIPT----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Receipt.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Receipt was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Receipt with id=${id}. Maybe Receipt was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Receipt with id=' + id,
      })
    })
}
