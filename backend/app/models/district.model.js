module.exports = (sequelize, Sequelize) => {
  const district = sequelize.define('district', {
    name: {
      type: Sequelize.STRING,
    },
    idname: {
      type: Sequelize.STRING,
    },
    province_id: {
      type: Sequelize.INTEGER,
    },
  })
  return district
}
