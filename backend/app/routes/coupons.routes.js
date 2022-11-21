module.exports = (app) => {
  const coupons = require('../controllers/coupons.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create new coupons
  router.post('/add', verify, coupons.create)
  // Retrieve all coupons
  router.get('/getall', verify, coupons.findAll)
  // Retrieve a single coupons with id
  router.get('/getOne/:id', verify, coupons.findOne)
  // Update a coupons with id
  router.put('/update/:id', verify, coupons.update)
  // Delete a coupons with id
  router.delete('/delete/:id', verify, coupons.delete)

  app.use('/api/coupons', router)
}
