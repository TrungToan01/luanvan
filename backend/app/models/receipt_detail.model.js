module.exports = (sequelize, Sequelize) => {
  const receipt_detail = sequelize.define('receipt_detail', {
    receipt_id: {
      type: Sequelize.INTEGER,
    },
    product_option_id: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    price: {
      type: Sequelize.INTEGER,
    },
  })
  return receipt_detail
}
