"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Topic.hasMany(models.Post, {
        foreignKey: "topic_id",
        as: "TopicIdData",
      });
    }
  }
  Topic.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      sort_order: DataTypes.INTEGER,
      description: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Topic",
      paranoid: true,
    }
  );
  return Topic;
};
