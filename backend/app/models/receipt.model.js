module.exports = (sequelize, Sequelize) => {
  const receipt = sequelize.define('receipt', {
    supplierId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    total_price: {
      type: Sequelize.INTEGER,
    },
  })
  return receipt
}
