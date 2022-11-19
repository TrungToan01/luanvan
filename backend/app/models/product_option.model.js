module.exports = (sequelize, Sequelize) => {
  const product_option = sequelize.define("product_option", {
    product_id: {
      type: Sequelize.INTEGER
    },
    ram_id: {
      type: Sequelize.INTEGER
    },
    rom_id: {
      type: Sequelize.INTEGER
    },
    color_id: {
      type: Sequelize.INTEGER
    },
    original_price: {
      type:Sequelize.INTEGER
    },
    sale_price: {
      type:Sequelize.INTEGER
    },
    quantity: {
      type:Sequelize.INTEGER
      },
    sold_quantity: {
        type:Sequelize.INTEGER
    }
  });
    return product_option;
};