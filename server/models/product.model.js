module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Product;
};
