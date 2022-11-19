module.exports = (sequelize, Sequelize) => {
  const product_image = sequelize.define('product_image', {
    image: {
      type: Sequelize.STRING,
    },
    productId: {
      type: Sequelize.INTEGER,
    },
    colorId: {
      type: Sequelize.INTEGER,
    },
  })
  return product_image
}
