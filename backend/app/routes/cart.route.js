module.exports = (app) => {
  const cart = require('../controllers/cart.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create new cart
  router.post('/add', verify, cart.create)
  // Retrieve all cart
  router.get('/getall', verify, cart.findAll)
  // Retrieve a single cart with id
  router.get('/getOne/:id', verify, cart.findOne)
  // Update a cart with id
  router.put('/update/:id', verify, cart.update)
  // Delete a cart with id
  router.delete('/delete/:id', verify, cart.delete)

  app.use('/api/cart', router)
}
