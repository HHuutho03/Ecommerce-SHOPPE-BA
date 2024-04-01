"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Doctor_Info.belongsTo(models.User, { foreignKey: "doctorId" });
      // // define association here
      // //? field columns allCode
      // Doctor_Info.belongsTo(models.Allcode, {
      //   foreignKey: "priceId",
      //   targetKey: "keyMap",
      //   as: "priceTypeData",
      // });
      // Doctor_Info.belongsTo(models.Allcode, {
      //   foreignKey: "provinceId",
      //   targetKey: "keyMap",
      //   as: "provinceIdTypeData",
      // });
      // Doctor_Info.belongsTo(models.Allcode, {
      //   foreignKey: "paymentId",
      //   targetKey: "keyMap",
      //   as: "paymentIdTypeData",
      // });
    }
  }

  Config.init(
    {
      author: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      zalo: DataTypes.STRING,
      facebook: DataTypes.STRING,
      address: DataTypes.STRING,
      metadesc: DataTypes.STRING,
      metakey: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Config",
      freezeTableName: true,
    }
  );
  return Config;
};
