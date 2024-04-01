"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: "Category_id",
        as: "CategoryIdData",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      image: DataTypes.STRING,
      parent_id: DataTypes.INTEGER,
      sort_order: DataTypes.INTEGER,
      description: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Category",
      paranoid: true,
    }
  );
  return Category;
};
