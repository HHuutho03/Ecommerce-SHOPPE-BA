"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Brand, {
        foreignKey: "brand_id",
        targetKey: "id",
        as: "brandIdData",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "Category_id",
        targetKey: "id",
        as: "CategoryIdData",
      });
      Product.hasOne(models.ProductSale, {
        foreignKey: "product_id",
        as: "productIdSale",
      });
      Product.hasOne(models.ProductStore, {
        foreignKey: "product_id",
        as: "productIdStore",
      });
    }
  }
  Product.init(
    {
      category_id: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      detail: DataTypes.TEXT,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      paranoid: true,
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
