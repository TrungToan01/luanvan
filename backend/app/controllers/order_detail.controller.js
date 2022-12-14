const db = require('../models')
const Product_detail = db.Product_detail
const Op = db.Sequelize.Op
const serverPage = require('./page')

// ----------------------------------FIND ALL ORDER DETAIL----------------------------------
exports.create = (req, res) => {
  if (
    !req.body.orderId ||
    req.body.quantity <= 0 ||
    !req.body.price ||
    !req.body.productOptionId
  ) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }
  Product_detail.create(req.body)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating the Product_detail.',
      })
    })
}

// ----------------------------------FIND ALL ORDER DETAIL----------------------------------
exports.findAll = (req, res) => {
  const page = req?.body?.page
  const size = req?.body?.size
  const pro_detail = {
    productOptionId: req.body.productOptionId,
  }
  var condition = productOptionId
    ? {
        productOptionId: {
          [Op.like]: `%${pro_detail.productOptionId}%`,
        },
      }
    : null

  const { limit, offset } = serverPage.getPagination(page, size)
  Product_detail.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = serverPage.getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving Product_detail .',
      })
    })
}

// ----------------------------------FIND BY ID ORDER DETAIL----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Product_detail.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find Product_detail with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Product_detail with id=' + id,
      })
    })
}

// ----------------------------------UPDATE ORDER DETAIL----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Product_detail.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Product_detail was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Product_detail with id=${id}. Maybe Product_detail was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Product_detail with id=' + id,
      })
    })
}

// ----------------------------------DELETE ORDER DETAIL----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Product_detail.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Product_detail was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Product_detail with id=${id}. Maybe Product_detail was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Product_detail with id=' + id,
      })
    })
}
