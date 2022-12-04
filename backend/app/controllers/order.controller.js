const db = require('../models')
const Order = db.order
const Op = db.Sequelize.Op
const serverPage = require('./page')
const User = db.user
const Coupons = db.coupons
const Order_Status = db.order_status

Order_Status.hasMany(Order)
Order.belongsTo(Order_Status)

User.hasMany(Order)
Order.belongsTo(User)

Coupons.hasMany(Order)
Order.belongsTo(Coupons)

// ----------------------------------CREATE ORDER----------------------------------
exports.create = (req, res) => {
  if (!req.body.userId || !req.body.shopInfoId) {
    return res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  req.body.couponId = req?.body?.couponId || '0'
  req.body.total_price = req?.body?.total_price || '0'
  req.body.delivery_cost = req?.body?.delivery_cost || '0'
  Order.create(req.body)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Order.',
      })
    })
}

// ----------------------------------FIND ALL ORDER----------------------------------
exports.findAll = (req, res) => {
  const page = req?.query?.page
  const size = req?.query?.size
  const { limit, offset } = serverPage.getPagination(page, size)
  Order.findAndCountAll({
    limit,
    offset,
    include: [User, Coupons, Order_Status],
  })
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
  Order.findByPk(id, { include: [User, Coupons, Order_Status] })
    .then((data) => {
      if (data) {
        res.send({ rows: data })
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
