module.exports = (app) => {
  const province = require('../controllers/province.controller')
  var router = require('express').Router()

  // Create new province
  router.post('/create', province.create)
  // Retrieve all province
  router.get('/getall', province.findAll)
  // Retrieve a single province with id
  router.get('/getOne/:id', province.findOne)
  // Update a province with id
  router.put('/update/:id', province.update)
  // Delete a province with id
  router.delete('/delete/:id', province.delete)

  app.use('/api/province', router)
}
