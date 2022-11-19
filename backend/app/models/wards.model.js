module.exports = (sequelize, Sequelize) => {
  const ward = sequelize.define('ward', {
    name: {
      type: Sequelize.STRING,
    },
    districtId: {
      type: Sequelize.INTEGER,
    },
    idname: {
      type: Sequelize.STRING,
    },
  })
  return ward
}
