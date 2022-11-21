module.exports = (app) => {
  const rom_option = require('../controllers/rom.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create a new rom_option
  router.post('/add', verify, rom_option.create)
  // Retrieve all rom_option
  router.get('/getall', rom_option.findAll)
  // Retrieve a single rom_option with id
  router.get('/getOne/:id', rom_option.findOne)
  // Update a rom_option with id
  router.put('/update/:id', verify, rom_option.update)
  // Delete a rom_option with id
  router.delete('/delete/:id', verify, rom_option.delete)
  app.use('/api/roms', router)
}
