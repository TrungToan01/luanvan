const db = require('../models')
const Receipt_detail = db.receipt_detail
const Op = db.Sequelize.Op
const Receipt = db.receipt
const Product = db.product_option

Receipt.hasMany(Receipt_detail)
Receipt_detail.belongsTo(Receipt)

Product.hasMany(Receipt_detail)
Receipt_detail.belongsTo(Product)
// ----------------------------------CREATE Receipt_detail----------------------------------
exports.create = (req, res) => {
  if (!req.body.receiptId || !req.body.productOptionId || !req.body.price) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }
  Receipt_detail.create(req.body)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating the Receipt_detail.',
      })
    })
}

// ----------------------------------FIND ALL Receipt_detail----------------------------------
exports.findAll = (req, res) => {
  Receipt_detail.findAll({ include: [Product, Receipt] })
    .then((data) => {
      return res.send({ rows: data })
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Receipt_detail.',
      })
    })
}

// ----------------------------------FIND BY ID Receipt_detail----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Receipt_detail.findByPk(id, { include: [Product, Receipt] })
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find Receipt_detail with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Receipt_detail with id=' + id,
      })
    })
}

// ----------------------------------UPDATE Receipt_detail----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Receipt_detail.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Receipt_detail was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Receipt_detail with id=${id}. Maybe Receipt_detail was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Receipt_detail with id=' + id,
      })
    })
}

// ----------------------------------DELETE Receipt_detail----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Receipt_detail.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Receipt_detail was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Receipt_detail with id=${id}. Maybe Receipt_detail was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Receipt_detail with id=' + id,
      })
    })
}
