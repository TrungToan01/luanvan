module.exports = (app) => {
  const brand = require('../controllers/brand.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create new brand
  router.post('/add', verify, brand.create)
  // Retrieve all brand
  router.get('/getall', verify, brand.findAll)
  // Retrieve a single brand with id
  router.get('/getOne/:id', verify, brand.findOne)
  // Update a brand with id
  router.put('/update/:id', verify, brand.update)
  // Delete a brand with id
  router.delete('/delete/:id', verify, brand.delete)

  app.use('/api/brands', router)
}
