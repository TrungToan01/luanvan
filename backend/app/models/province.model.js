module.exports = (sequelize, Sequelize) => {
  const province = sequelize.define("province", {
    name: {
      type: Sequelize.STRING
    }
  });
    return province;
};