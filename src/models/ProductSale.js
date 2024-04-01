"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductSale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductSale.belongsTo(models.Product, {
        foreignKey: "product_id",
        targetKey: "id",
        as: "productIdSale",
      });
    }
  }
  ProductSale.init(
    {
      product_id: DataTypes.INTEGER,
      pricesale: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      date_begin: DataTypes.DATE,
      date_end: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProductSale",
    }
  );
  return ProductSale;
};
