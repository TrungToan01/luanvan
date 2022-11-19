const multer = require('multer')

const storage = multer.diskStorage({
  destination: 'images/products',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-nttoan-${file.originalname}`)
  },
})

const uploadImage = multer({ storage: storage })
module.exports = (app) => {
  const products = require('../controllers/product_image.controller')
  var router = require('express').Router()
  //create
  router.post('/add', uploadImage.single('image'), products.create)
  // Retrieve all products
  router.get('/getall', products.findAll)
  // Retrieve a single products with id
  router.get('/getOne/:id', products.findOne)
  // Update a products with id
  router.put('/update/:id', uploadImage.single('image'), products.update)
  // Delete a products with id
  router.delete('/delete/:id', products.delete)

  app.use('/api/products_image', router)
}
