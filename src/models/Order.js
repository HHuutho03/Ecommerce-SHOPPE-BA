"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "userIdIdData",
      });
      Order.hasMany(models.OrderDetail, {
        foreignKey: "order_id",
        as: "orderIdData",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      delivery_name: DataTypes.STRING,
      delivery_gender: DataTypes.STRING,
      delivery_email: DataTypes.STRING,
      delivery_phone: DataTypes.STRING,
      delivery_address: DataTypes.STRING,
      note: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
      paranoid: true,
    }
  );
  return Order;
};
