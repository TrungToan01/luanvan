module.exports = (sequelize, Sequelize) => {
  const product_rating = sequelize.define('product_rating', {
    rating: {
      type: Sequelize.INTEGER,
    },
    content: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    productId: {
      type: Sequelize.INTEGER,
    },
  })
  return product_rating
}
