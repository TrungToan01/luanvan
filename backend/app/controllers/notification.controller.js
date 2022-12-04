const db = require('../models')
const Notification = db.notification
const Op = db.Sequelize.Op
const serverPage = require('./page')
const User = db.user

User.hasMany(Notification)
Notification.belongsTo(User)
// ----------------------------------FIND ALL COUPON----------------------------------
exports.create = (req, res) => {
  if (!req.body.title || !req.body.content || !req.body.userId) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const notification = {
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    viewed: req.body.viewed ? req.body.viewed : false,
    published: req.body.published ? req.body.published : true,
  }
  Notification.create(notification)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Notification.',
      })
    })
}

// ----------------------------------FIND ALL NOTIFICATION----------------------------------
exports.findAll = (req, res) => {
  const page = req?.body?.page
  const size = req?.body?.size
  const { limit, offset } = serverPage.getPagination(page, size)
  Notification.findAndCountAll({ limit, offset, include: User })
    .then((data) => {
      const response = serverPage.getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Notification .',
      })
    })
}

// ----------------------------------FIND BY ID COUPON----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Notification.findByPk(id, { include: User })
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find Notification with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Notification with id=' + id,
      })
    })
}

// ----------------------------------UPDATE----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Notification.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Notification was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Notification with id=${id}. Maybe Notification was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Notification with id=' + id,
      })
    })
}

// ----------------------------------DELETE-----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Notification.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Notification was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Notification with id=${id}. Maybe Notification was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Notification with id=' + id,
      })
    })
}
