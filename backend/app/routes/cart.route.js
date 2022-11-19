module.exports = (app) => {
  const cart = require('../controllers/cart.controller')
  var router = require('express').Router()
  // Create new cart
  router.post('/create', cart.create)
  // Retrieve all cart
  router.get('/getall', cart.findAll)
  // Retrieve a single cart with id
  router.get('/getOne/:id', cart.findOne)
  // Update a cart with id
  router.put('/update/:id', cart.update)
  // Delete a cart with id
  router.delete('/delete/:id', cart.delete)

  app.use('/api/cart', router)
}
