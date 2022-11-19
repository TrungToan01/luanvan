module.exports = (sequelize, Sequelize) => {
  const ram_option = sequelize.define("ram_option", {
    name: {
      type: Sequelize.STRING
    }
  });
    return ram_option;
};