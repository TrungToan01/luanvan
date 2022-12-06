const db = require('../models')
const Shop_info = db.shop_info
const Op = db.Sequelize.Op

// ----------------------------------CREATE SHOP INFO----------------------------------
exports.create = (req, res) => {
  console.log(req.body)
  Shop_info.create(req.body)
    .then((data) => {
      res.send({ rows: data })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating the shop information.',
      })
    })
}

// ----------------------------------FIND ALL SHOP INFO----------------------------------
exports.findAll = (req, res) => {
  Shop_info.findAll({ where: null })
    .then((data) => {
      const response = serverPage.getPagingData(data)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving shop information.',
      })
    })
}

// ----------------------------------FIND BY ID SHOP INFO----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Shop_info.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find shop information with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving shop information with id=' + id,
      })
    })
}

// ----------------------------------UPDATE SHOP INFO----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Shop_info.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Shop information was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update shop information with id=${id}. Maybe shop information was not found or form is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating shop information with id=' + id,
      })
    })
}

// ----------------------------------DELETE SHOP INFO----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Shop_info.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Shop information was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete shop information with id=${id}. Maybe shop information was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete shop information with id=' + id,
      })
    })
}
