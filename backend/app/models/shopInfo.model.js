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
    phone_number: {
      type: Sequelize.STRING,
    },
    province_id: {
      type: Sequelize.INTEGER,
    },
    district_id: {
      type: Sequelize.INTEGER,
    },
    ward_id: {
      type: Sequelize.INTEGER,
    },
    ward_code: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    full_address: {
      type: Sequelize.STRING,
    },
  })
  return shop_info
}
