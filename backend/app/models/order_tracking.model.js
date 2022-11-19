module.exports = (sequelize, Sequelize) => {
  const order_tracking = sequelize.define("order_tracking", {
    status_id: {
      type: Sequelize.INTEGER
    },
    order_id: {
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER
    }
  });
    return order_tracking;
};