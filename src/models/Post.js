"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Topic, {
        foreignKey: "topic_id",
        targetKey: "id",
        as: "TopicIdData",
      });
    }
  }
  Post.init(
    {
      topic_id: DataTypes.INTEGER,
      slug: DataTypes.STRING,
      title: DataTypes.STRING,
      detail: DataTypes.TEXT,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      type: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Post",
      paranoid: true,
    }
  );
  return Post;
};
