const db = require('../models')
const Order = db.order
const Op = db.Sequelize.Op
const serverPage = require('./page')

// ----------------------------------CREATE ORDER----------------------------------
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const order = {
    total_price: req.body.total_price,
    delivery_cost: req.body.delivery_cost,
    coupons_id: req.body.coupons_id,
    discount_value: req.body.discount_value,
    status_id: req.body.status_id,
    shop_name: req.body.shop_name,
    shop_phone: req.body.shop_phone,
    shop_address: req.body.shop_address,
    customer_id: req.body.customer_id,
    customer_name: req.body.customer_name,
    customer_phone: req.body.customer_phone,
    customer_address: req.body.customer_address,
  }
  Order.create(order)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Order.',
      })
    })
}

// ----------------------------------FIND ALL ORDER----------------------------------
exports.findAll = (req, res) => {
  var condition = customer_id
    ? { customer_id: { [Op.like]: `%${req.body.customer_id}%` } }
    : null
  Order.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = serverPage.getPagingData(data)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Order .',
      })
    })
}

// ----------------------------------FIND BY ID ORDER----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Order.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Order with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Order with id=' + id,
      })
    })
}

// ----------------------------------UPDATE ORDER----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Order.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Order was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Order with id=' + id,
      })
    })
}

// ----------------------------------DELETE ORDER----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Order.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Order was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Order with id=' + id,
      })
    })
}
