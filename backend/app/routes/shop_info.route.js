module.exports = (app) => {
  const shop_info = require('../controllers/shop_info.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  //create
  router.post('/add', verify, shop_info.create)
  // Retrieve all shop_info
  router.get('/getall', verify, shop_info.findAll)
  // Retrieve a single shop_info with id
  router.get('/getOne/:id', verify, shop_info.findOne)
  // Update a shop_info with id
  router.put('/update/:id', verify, shop_info.update)
  // Delete a shop_info with id
  router.delete('/delete/:id', verify, shop_info.delete)

  app.use('/api/shop_info', router)
}
