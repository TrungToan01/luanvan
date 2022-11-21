module.exports = (app) => {
  const color = require('../controllers/color-option.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create new color
  router.post('/add', verify, color.create)
  // Retrieve all color
  router.get('/getall', verify, color.findAll)
  // Retrieve a single color with id
  router.get('/getOne/:id', verify, color.findOne)
  // Update a color with id
  router.put('/update/:id', verify, color.update)
  // Delete a color with id
  router.delete('/delete/:id', verify, color.delete)

  app.use('/api/colors', router)
}
