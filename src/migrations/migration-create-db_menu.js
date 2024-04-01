"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Menus", {
      // currentNumber: DataTypes.INTEGER,
      // maxNumber: DataTypes.INTEGER,
      // date: DataTypes.DATE,
      // timeType: DataTypes.STRING,
      // doctorId: DataTypes.INTEGER,

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      link: {
        type: Sequelize.STRING,
      },
      sort_order: {
        type: Sequelize.INTEGER,
      },
      parent_id: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      table_id: {
        type: Sequelize.INTEGER,
      },
      description: {
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
    await queryInterface.dropTable("Menus");
  },
};
