const db = require('../models')
const Products_option = db.product_option
const Op = db.Sequelize.Op
const serverPage = require('./page')
const Brand = db.brand
const Image = db.product_image
const Color = db.color_option
const Ram = db.ram_option
const Rom = db.rom_option
const User = db.user

Ram.hasMany(Products_option)
Products_option.belongsTo(Ram)

Rom.hasMany(Products_option)
Products_option.belongsTo(Rom)

User.hasMany(Products_option)
Products_option.belongsTo(User)

Color.hasMany(Products_option)
Products_option.belongsTo(Color)

Products_option.hasMany(Image)
Image.belongsTo(Products_option)

Brand.hasMany(Products_option)
Products_option.belongsTo(Brand)

// ----------------------------------CREATE PRODUCT OPTION----------------------------------
exports.create = (req, res) => {
  if (
    !req.body.name ||
    !req.body.colorOptionId ||
    !req.body.ramOptionId ||
    !req.body.romOptionId
  ) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }
  req.body.original_price = req?.body?.original_price || '0'
  req.body.sale_price = req?.body?.sale_price || '0'
  req.body.quantity = req?.body?.quantity || '0'
  req.body.published = req?.body?.published || true
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
  Products_option.findAndCountAll({
    include: [Brand, Image, Color, User, Ram, Rom],
    limit,
    offset,
  })
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
  Products_option.findByPk(id, {
    include: [Brand, Image, Color, User, Ram, Rom],
  })
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
