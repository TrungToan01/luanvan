const db = require('../models')
const Supplier = db.supplier
const Province = db.province
const District = db.district
const Ward = db.wards
const Op = db.Sequelize.Op
const serverPage = require('./page')

// ----------------------------------CREATE SUPPLIER----------------------------------
exports.create = async (req, res) => {
  if (!req.body.name || !req.body.phone_number || !req.body.address) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }
  const province = await Province.findByPk(req.body.province_id)
  const district = await District.findByPk(req.body.district_id)
  const ward = await Ward.findByPk(req.body.wards_id)

  req.body.address =
    req.body.address +
    ', ' +
    ward?.name +
    ', ' +
    district?.name +
    ', ' +
    province?.name
  Supplier.create(req.body)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the supplier.',
      })
    })
}

// ----------------------------------FIND ALL SUPPLIER----------------------------------
exports.findAll = (req, res) => {
  const page = req?.body?.page
  const size = req?.body?.size
  const { limit, offset } = serverPage.getPagination(page, size)
  Supplier.findAndCountAll({ where: null, limit, offset })
    .then((data) => {
      const response = serverPage.getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving supplier.',
      })
    })
}

// ----------------------------------FIND BY ID SUPPLIER----------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id
  Supplier.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ rows: data })
      } else {
        res.status(404).send({
          message: `Cannot find Supplier with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Supplier with id=' + id,
      })
    })
}

// ----------------------------------UPDATE SUPPLIER----------------------------------
exports.update = (req, res) => {
  const id = req.params.id
  Supplier.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Supplier was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Supplier with id=${id}. Maybe Supplier was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Supplier with id=' + id,
      })
    })
}

// ----------------------------------DELETE SUPPLIER----------------------------------
exports.delete = (req, res) => {
  const id = req.params.id
  Supplier.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Supplier was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Supplier with id=${id}. Maybe Supplier was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Supplier with id=' + id,
      })
    })
}
