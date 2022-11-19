module.exports = (sequelize, Sequelize) => {
  const shop_info = sequelize.define('shop_info', {
    name: {
      type: Sequelize.STRING,
    },
    logo: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    provinceId: {
      type: Sequelize.INTEGER,
    },
    districtId: {
      type: Sequelize.INTEGER,
    },
    wardId: {
      type: Sequelize.INTEGER,
    },
    address: {
      type: Sequelize.STRING,
    },
  })
  return shop_info
}
