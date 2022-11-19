module.exports = (sequelize, Sequelize) => {
  const coupons = sequelize.define('coupons', {
    code: {
      type: Sequelize.STRING,
    },
    start_date: {
      type: Sequelize.DATE,
    },
    end_date: {
      type: Sequelize.DATE,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    used_quantity: {
      type: Sequelize.INTEGER,
    },
    discount_value: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  })
  return coupons
}
