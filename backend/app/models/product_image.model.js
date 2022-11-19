module.exports = (sequelize, Sequelize) => {
  const product_image = sequelize.define('product_image', {
    image: {
      type: Sequelize.STRING,
    },
    product_id: {
      type: Sequelize.INTEGER,
    },
    color_id: {
      type: Sequelize.INTEGER,
    },
  })
  return product_image
}
