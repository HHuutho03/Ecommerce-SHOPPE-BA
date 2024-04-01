"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Markdown.belongsTo(models.User, { foreignKey: "doctorId" });
    }
  }
  Menu.init(
    {
      name: DataTypes.STRING,
      link: DataTypes.STRING,
      sort_order: DataTypes.INTEGER,
      parent_id: DataTypes.INTEGER,
      type: DataTypes.STRING,
      table_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Menu",
      paranoid: true,
    }
  );
  return Menu;
};
