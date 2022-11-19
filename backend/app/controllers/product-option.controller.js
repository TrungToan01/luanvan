const db = require('../models')
const Products_option = db.product_option
const Op = db.Sequelize.Op
const serverPage = require('./page')

// ----------------------------------CREATE PRODUCT OPTION----------------------------------
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const product_option = {
    product_id: req.body.product_id,
    ram_id: req.body.ram_id,
    rom_id: req.body.rom_id,
    color_id: req.body.color_id,
    original_price: req.body.original_price,
    sale_price: req.body.sale_price,
    quantity: req.body.quantity,
    sold_quantity: req.body.sold_quantity,
  }
  Products_option.create(product_option)
    .then((data) => {
      return res.send(data)
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
        res.send(data)
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
