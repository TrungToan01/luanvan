module.exports = (sequelize, Sequelize) => {
  const cart = sequelize.define('cart', {
    user_id: {
      type: Sequelize.INTEGER,
    },
    product_option_id: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
  })
  return cart
}
