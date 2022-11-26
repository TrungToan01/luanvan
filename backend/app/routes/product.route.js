module.exports = (app) => {
  const product = require('../controllers/product.controller')
  var router = require('express').Router()

  // Create new product
  router.post('/add', product.create)
  // Retrieve all product
  router.get('/getall', product.findAll)
  // Retrieve a single product with id
  router.get('/getOne/:id', product.findOne)
  // Update a product with id
  router.put('/update/:id', product.update)
  // Delete a product with id
  router.delete('/delete/:id', product.delete)

  app.use('/api/product', router)
}
