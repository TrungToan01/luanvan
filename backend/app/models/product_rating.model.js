module.exports = (sequelize, Sequelize) => {
  const product_rating = sequelize.define('product_rating', {
    rating: {
      type: Sequelize.INTEGER,
    },
    content: {
      type: Sequelize.STRING,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    product_id: {
      type: Sequelize.INTEGER,
    },
  })
  return product_rating
}
