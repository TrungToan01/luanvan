module.exports = (sequelize, Sequelize) => {
  const user_address = sequelize.define('user_address', {
    userId: {
      type: Sequelize.INTEGER,
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
    is_default: {
      type: Sequelize.BOOLEAN,
    },
  })
  return user_address
}
