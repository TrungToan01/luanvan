module.exports = (sequelize, Sequelize) => {
  const receipt = sequelize.define("receipt", {
    supplier_id: {
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    total_price: {
      type: Sequelize.INTEGER
    }
  });
    return receipt;
};