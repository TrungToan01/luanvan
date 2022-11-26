module.exports = (sequelize, Sequelize) => {
  const product_image = sequelize.define('product_image', {
    image: {
      type: Sequelize.STRING,
    },
    productOptionId: {
      type: Sequelize.INTEGER,
    },
  })
  return product_image
}
