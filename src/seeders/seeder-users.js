"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@gmail.com",
          password: "123456",
          firstName: "tran",
          lastName: "Huu Tho",
          address: "HCM",
          gender: 1,
          phonenumber: 123456,
          image: null,
          roleId: "R1",
          positionId: "P0",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
