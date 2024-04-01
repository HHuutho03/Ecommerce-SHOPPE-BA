"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Booking.belongsTo(models.User, {
      //   foreignKey: "patientID",
      //   targetKey: "id",
      //   as: "patientData",
      // });
      // Booking.belongsTo(models.Allcode, {
      //   foreignKey: "timeType",
      //   targetKey: "keyMap",
      //   as: "timeTypeDataPatient",
      // });
    }
  }
  Banner.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      link: DataTypes.STRING,
      position: DataTypes.STRING,
      status: DataTypes.STRING,
      description: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Banner",
      paranoid: true,
    }
  );
  return Banner;
};
