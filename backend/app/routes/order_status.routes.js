module.exports = (app) => {
  const order_detail = require('../controllers/order_detail.controller')
  var router = require('express').Router()
  // Create new order_detail
  router.post('/create', order_detail.create)
  // Retrieve all order_detail
  router.get('/getall', order_detail.findAll)
  // Retrieve a single order_detail with id
  router.get('/getOne/:id', order_detail.findOne)
  // Update a order_detail with id
  router.put('/update/:id', order_detail.update)
  // Delete a order_detail with id
  router.delete('/delete/:id', order_detail.delete)

  app.use('/api/order_detail', router)
}
