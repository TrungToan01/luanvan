module.exports = (sequelize, Sequelize) => {
  const supplier = sequelize.define('suppliers', {
    name: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    description: {
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
  return supplier
}
