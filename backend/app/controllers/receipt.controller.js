const db = require('../models')
const Receipt = db.receipt
const Op = db.Sequelize.Op
const Receipt_detail = db.receipt_detail
const User = db.user
const Supplier = db.supplier

Supplier.hasMany(Receipt)
Receipt.belongsTo(Supplier)

User.hasMany(Receipt)
Receipt.belongsTo(User)

Receipt.hasMany(Receipt_detail)
Receipt_detail.belongsTo(Receipt)
// ----------------------------------CREATE RECEIPT----------------------------------
exports.create = (req, res) => {
  if (!req.body.supplierId || !req.body.userId) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const receipt = {
    supplierId: req.body.supplierId,
    userId: req.body.userId,
    total_price: req.body.total_price || 0,
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
  Receipt.findAll({ include: [User, Supplier, Receipt_detail] })
    .then((data) => {
      return res.send({ rows: data, status: 200 })
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
  Receipt.findByPk(id, { include: [User, Supplier, Receipt_detail] })
    .then((data) => {
      if (data) {
        res.send({ rows: data })
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
