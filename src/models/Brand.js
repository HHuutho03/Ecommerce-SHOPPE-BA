"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brand.hasMany(models.Product, {
        foreignKey: "brand_id",
        as: "brandIdData",
      });
    }
  }
  Brand.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      image: DataTypes.STRING,
      sort_order: DataTypes.INTEGER,
      description: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Brand",
      paranoid: true,
    }
  );
  return Brand;
};
