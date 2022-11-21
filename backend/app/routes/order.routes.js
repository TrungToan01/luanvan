module.exports = (app) => {
  const order = require('../controllers/order.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create new order
  router.post('/add', verify, order.create)
  // Retrieve all order
  router.get('/getall', verify, order.findAll)
  // Retrieve a single order with id
  router.get('/getOne/:id', verify, order.findOne)
  // Update a order with id
  router.put('/update/:id', verify, order.update)
  // Delete a order with id
  router.delete('/delete/:id', verify, order.delete)

  app.use('/api/order', router)
}
