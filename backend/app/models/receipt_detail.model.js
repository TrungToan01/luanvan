module.exports = (sequelize, Sequelize) => {
  const receipt_detail = sequelize.define('receipt_detail', {
    receiptId: {
      type: Sequelize.INTEGER,
    },
    productOptionId: {
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
