module.exports = (app) => {
  const coupons = require('../controllers/coupons.controller')
  var router = require('express').Router()
  // Create new coupons
  router.post('/create', coupons.create)
  // Retrieve all coupons
  router.get('/getall', coupons.findAll)
  // Retrieve a single coupons with id
  router.get('/getOne/:id', coupons.findOne)
  // Update a coupons with id
  router.put('/update/:id', coupons.update)
  // Delete a coupons with id
  router.delete('/delete/:id', coupons.delete)

  app.use('/api/coupons', router)
}
