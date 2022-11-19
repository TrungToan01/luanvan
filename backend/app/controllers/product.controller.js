const db = require('../models')
const Products = db.products
const Op = db.Sequelize.Op
const serverPage = require('./page')

// ----------------------------------CREATE PRODUCT----------------------------------
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const product = {
    name: req.body.name,
    specifications: req.body.specifications,
    description: req.body.description,
    width: req.body.width,
    height: req.body.height,
    weight: req.body.weight,
    length: req.body.length,
    published: req?.body?.published || true,
    brand_id: req.body / brand_id,
    user_id: req.body.user_id,
  }
  Products.create(product)
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

// ----------------------------------FIND ALL PRODUCT----------------------------------
exports.findAll = (req, res) => {
  const page = req?.body?.page
  const size = req?.body?.size
  const { limit, offset } = serverPage.getPagination(page, size)
  var condition
  const product = {
    name: req.body.name,
    specifications: req.body.specifications,
    description: req.body.description,
    brand_id: req.body.brand_id,
  }
  if (product.name) {
    condition = { name: { [Op.like]: `%${product.name}` } }
  } else {
    if (product.brand_id) {
      condition = { brand_id: { [Op.like]: `%${product.brand_id}` } }
    } else {
      if (product.specifications) {
        condition = {
          specifications: { [Op.like]: `%${product.specifications}` },
        }
      } else {
        if (product.description) {
          condition = { description: { [Op.like]: `%${product.description}` } }
        } else {
          condition = null
        }
      }
    }
  }
  Products.findAndCountAll({ where: condition, limit, offset })
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
  Products.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
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
