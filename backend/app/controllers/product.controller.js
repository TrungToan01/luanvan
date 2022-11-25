const db = require('../models')
const Products = db.products
const Op = db.Sequelize.Op
const serverPage = require('./page')
const Brand = db.brand
const Product_Op = db.product_option

Brand.hasMany(Products)
Products.belongsTo(Brand)

Products.hasMany(Product_Op)
Product_Op.belongsTo(Products)

// ----------------------------------CREATE PRODUCT----------------------------------
exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  req.body.published = req.body.published ? req.body.published : true

  const brand = await Brand.findOne({ where: { id: req.body.brandId } })

  await Products.create(req.body, { include: Brand })
    .then((data) => {
      const response = {
        name: data.name,
        brand: brand.name,
      }
      return res.send({ rows: response, message: 'Create success!' })
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the product.',
      })
    })
}

// ----------------------------------FIND ALL PRODUCT----------------------------------
exports.findAll = (req, res) => {
  const page = req?.body?.page
  const size = req?.body?.size
  const { limit, offset } = serverPage.getPagination(page, size)
  Products.findAndCountAll({ include: [Brand, Product_Op], limit, offset })
    .then((data) => {
      const response = serverPage.getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving product.',
      })
    })
}

// ----------------------------------FIND BY ID PRODUCT----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Products.findByPk(id, { include: [Brand, Product_Op] })
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find product with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving product with id=' + id,
      })
    })
}

// ----------------------------------UPDATE PRODUCT----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Products.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Product was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update product with id=${id}. Maybe product was not found or body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating product with id=' + id,
      })
    })
}

// ----------------------------------DELETE PRODUCT----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Products.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Product was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete product with id=${id}. Maybe product was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete product with id=' + id,
      })
    })
}
