module.exports = (sequelize, Sequelize) => {
  const supplier = sequelize.define('suppliers', {
    name: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    province_id: {
      type: Sequelize.INTEGER,
    },
    district_id: {
      type: Sequelize.INTEGER,
    },
    wards_id: {
      type: Sequelize.INTEGER,
    },
    address: {
      type: Sequelize.STRING,
    },
  })
  return supplier
}
