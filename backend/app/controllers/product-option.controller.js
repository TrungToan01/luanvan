const db = require('../models')
const Products_option = db.product_option
const Op = db.Sequelize.Op
const serverPage = require('./page')

// ----------------------------------CREATE PRODUCT OPTION----------------------------------
exports.create = (req, res) => {
  if (
    !req.body.productId ||
    !req.body.ramId ||
    !req.body.romId ||
    !req.body.quantity
  ) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }
  Products_option.create(req.body)
    .then((data) => {
      return res.send({ rows: data })
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the product.',
      })
    })
}

// ----------------------------------FIND ALL PRODUCT OPTION----------------------------------
exports.findAll = (req, res) => {
  const page = req?.body?.page
  const size = req?.body?.size
  const { limit, offset } = serverPage.getPagination(page, size)
  Products_option.findAndCountAll({ where: null, limit, offset })
    .then((data) => {
      const response = serverPage.getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving product option.',
      })
    })
}

// ----------------------------------FIND BY ID PRODUCT OPTION----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Products_option.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find product option with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving product with id=' + id,
      })
    })
}

// ----------------------------------UPDATE PRODUCT OPTION----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Products_option.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Product option was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update product option with id=${id}. Maybe product option was not found or body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating product option with id=' + id,
      })
    })
}

// ----------------------------------DELETE PRODUCT OPTION----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Products_option.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Product option was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete product option with id=${id}. Maybe product option was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete product option with id=' + id,
      })
    })
}
