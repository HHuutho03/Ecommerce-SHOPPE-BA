"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "userIdData",
      });
    }
  }
  Contact.init(
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.TEXT("medium"),
      replay_id: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Contact",
      paranoid: true,
    }
  );
  return Contact;
};
