"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Contact, {
        foreignKey: "user_id",
        as: "userIdData",
      });
      User.hasMany(models.Order, {
        foreignKey: "user_id",
        as: "userIdIdData",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
    }
  );
  return User;
};
