module.exports = (app) => {
  const brand = require('../controllers/brand.controller')
  var router = require('express').Router()
  // Create new brand
  router.post('/create', brand.create)
  // Retrieve all brand
  router.get('/getall', brand.findAll)
  // Retrieve a single brand with id
  router.get('/getOne/:id', brand.findOne)
  // Update a brand with id
  router.put('/update/:id', brand.update)
  // Delete a brand with id
  router.delete('/delete/:id', brand.delete)

  app.use('/api/brand', router)
}
