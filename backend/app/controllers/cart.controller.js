const db = require('../models')
const Cart = db.cart
const serverPage = require('./page')

// ----------------------------------CREATE CART----------------------------------
exports.create = (req, res) => {
  if (
    !req.body.user_id ||
    !req.body.product_option_id ||
    req.body.quantity <= 0
  ) {
    return res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  const cart = {
    user_id: req.body.user_id,
    product_option_id: req.body.product_option_id,
    quantity: req.body.quantity,
  }
  Cart.create(cart)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the cart.',
      })
    })
}

// ----------------------------------FIND ALL CART----------------------------------
exports.findAll = (req, res) => {
  const page = req?.body?.page
  const size = req?.body?.size
  const { limit, offset } = serverPage.getPagination(page, size)
  Cart.findAndCountAll({ where: null, limit, offset })
    .then((data) => {
      const response = serverPage.getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving cart .',
      })
    })
}

// ----------------------------------FIND BY ID CART----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Cart.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find cart with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving cart with id=' + id,
      })
    })
}

// ----------------------------------UPDATE CART----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Cart.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Cart was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Cart with id=' + id,
      })
    })
}

// ----------------------------------DELETE CART----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Cart.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Cart was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Cart with id=' + id,
      })
    })
}
