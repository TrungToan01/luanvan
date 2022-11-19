module.exports = (sequelize, Sequelize) => {
  const user_address = sequelize.define('user_address', {
    user_id: {
      type: Sequelize.INTEGER,
    },
    username: {
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
    wards: {
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

    is_default: {
      type: Sequelize.BOOLEAN,
    },
  })
  return user_address
}
