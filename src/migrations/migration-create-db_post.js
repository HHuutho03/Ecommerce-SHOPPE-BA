"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      topic_id: {
        type: Sequelize.INTEGER,
      },
      slug: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      detail: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.BLOB("long"),
      },
      type: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Posts");
  },
};
