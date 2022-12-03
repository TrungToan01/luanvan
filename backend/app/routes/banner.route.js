const multer = require('multer')

const storage = multer.diskStorage({
  destination: 'images/banners',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-nttoan-${file.originalname}`)
  },
})

const uploadAvatar = multer({ storage: storage })

module.exports = (app) => {
  const Banner = require('../controllers/banner.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create new Banner
  router.post('/add', verify, uploadAvatar.single('image'), Banner.create)
  // Retrieve all Banner
  router.get('/getall', verify, Banner.findAll)
  // Retrieve a single Banner with id
  router.get('/getOne/:id', verify, Banner.findOne)
  // Update a Banner with id
  router.put('/update/:id', verify, uploadAvatar.single('image'), Banner.update)
  // Delete a Banner with id
  router.delete('/delete/:id', verify, Banner.delete)

  app.use('/api/Banners', router)
}
