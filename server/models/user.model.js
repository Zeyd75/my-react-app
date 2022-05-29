module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    pseudo: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      max: 1024,
      minLength: 6,
    },
    isAdmin: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    },
  });

  return User;
};
