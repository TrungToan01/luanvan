const db = require('../models')
const Brand = db.brand
const serverPage = require('./page')

// ----------------------------------CREATE BRAND----------------------------------
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const brand = {
    name: req.body.name,
    published: req.body.published || true,
  }
  Brand.create(brand)
    .then((data) => {
      return res.send({ rows: data })
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the Brand.',
      })
    })
}

// ----------------------------------FIND ALL BRAND----------------------------------
exports.findAll = (req, res) => {
  const page = req?.body?.page
  const size = req?.body?.size
  const { limit, offset } = serverPage.getPagination(page, size)
  Brand.findAndCountAll({ where: null, limit, offset })
    .then((data) => {
      const response = serverPage.getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Brand .',
      })
    })
}

// ----------------------------------FIND BY ID BRAND----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Brand.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find Brand with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Brand with id=' + id,
      })
    })
}

// ----------------------------------UPDATE BRAND----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Brand.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Brand was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Brand with id=${id}. Maybe Brand was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Cart with id=' + id,
      })
    })
}

// ----------------------------------DELETE BRAND----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Brand.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Brand was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Brand with id=${id}. Maybe Brand was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Brand with id=' + id,
      })
    })
}
