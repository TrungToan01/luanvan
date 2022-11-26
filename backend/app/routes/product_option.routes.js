module.exports = (app) => {
  const product = require('../controllers/product-option.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create new product
  router.post('/add', verify, product.create)
  // Retrieve all product
  router.get('/getall', product.findAll)
  // Retrieve a single product with id
  router.get('/getOne/:id', product.findOne)
  // Update a product with id
  router.put('/update/:id', verify, product.update)
  // Delete a product with id
  router.delete('/delete/:id', verify, product.delete)

  app.use('/api/product', router)
}
