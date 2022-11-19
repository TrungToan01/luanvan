module.exports = (app) => {
  const color = require('../controllers/color-option.controller')
  var router = require('express').Router()
  // Create new color
  router.post('/create', color.create)
  // Retrieve all color
  router.get('/getall', color.findAll)
  // Retrieve a single color with id
  router.get('/getOne/:id', color.findOne)
  // Update a color with id
  router.put('/update/:id', color.update)
  // Delete a color with id
  router.delete('/delete/:id', color.delete)

  app.use('/api/color', router)
}
