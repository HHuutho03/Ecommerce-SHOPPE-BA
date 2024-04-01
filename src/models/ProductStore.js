"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductStore.belongsTo(models.Product, {
        foreignKey: "product_id",
        targetKey: "id",
        as: "productIdStore",
      });
    }
  }
  ProductStore.init(
    {
      product_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductStore",
    }
  );
  return ProductStore;
};
