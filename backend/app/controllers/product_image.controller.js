const db = require('../models')
const Product_img = db.product_image
const serverPage = require('./page')

// ----------------------------------CREATE PRODUCT IMAGE----------------------------------
exports.create = (req, res) => {
  if (!req.body.product_id) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const pro_image = {
    product_id: req.body.product_id,
    image: req?.file?.filename ? 'products' + req?.file?.filename : null,
    color_id: req.body.color_id,
  }
  Product_img.create(pro_image)
    .then((data) => {
      return res.send(data)
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating the product image.',
      })
    })
}

// ----------------------------------FIND ALL PRODUCT IMAGE----------------------------------
exports.findAll = (req, res) => {
  const page = req?.body?.page
  const size = req?.body?.size
  const { limit, offset } = serverPage.getPagination(page, size)
  Product_img.findAndCountAll({ where: null, limit, offset })
    .then((data) => {
      const response = serverPage.getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving product image .',
      })
    })
}

// ----------------------------------FIND BY ID PRODUCT IMAGE----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Product_img.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find product image with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving product image with id=' + id,
      })
    })
}

// ----------------------------------UPDATE PRODUCT IMAGE----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Product_img.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Product image was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update product image with id=${id}. Maybe product image was not found or body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating product image with id=' + id,
      })
    })
}

// ----------------------------------DELETE PRODUCT IMAGE----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Product_img.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Product image was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete product image with id=${id}. Maybe product image was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete product image with id=' + id,
      })
    })
}
