const db = require('../models')
const Banner = db.banner
const serverPage = require('./page')
const User = db.user

User.hasMany(Banner)
Banner.belongsTo(User)
// ----------------------------------CREATE Banner----------------------------------
exports.create = (req, res) => {
  if ((!req.body.name, !req.file)) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const data = {
    name: req.body.name,
    published: req.body.published || true,
    image: '/banners/' + req?.file?.filename,
    userId: req.body.userId,
  }
  Banner.create(data)
    .then((response) => {
      return res.send({ rows: response })
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Banner.',
      })
    })
}

// ----------------------------------FIND ALL Banner----------------------------------
exports.findAll = (req, res) => {
  const page = req?.body?.page
  const size = req?.body?.size
  const { limit, offset } = serverPage.getPagination(page, size)
  Banner.findAndCountAll({ where: null, limit, offset, include: User })
    .then((data) => {
      const response = serverPage.getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Banner .',
      })
    })
}

// ----------------------------------FIND BY ID Banner----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Banner.findByPk(id, { include: User })
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find Banner with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Banner with id=' + id,
      })
    })
}

// ----------------------------------UPDATE Banner----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  if (req.file) {
    req.body.image = '/banners/' + req.file.filename
  }
  console.log(req.body)
  Banner.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Banner was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Banner with id=${id}. Maybe Banner was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Cart with id=' + id,
      })
    })
}

// ----------------------------------DELETE Banner----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Banner.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Banner was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Banner with id=${id}. Maybe Banner was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Banner with id=' + id,
      })
    })
}
