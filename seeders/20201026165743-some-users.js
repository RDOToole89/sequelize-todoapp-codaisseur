"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Caitlin O'Toole",
          email: "caitlin@email.com",
          phone: 123456789,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Roibin O'Toole",
          email: "roibin@email.com",
          phone: 123456789,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hans Klok",
          email: "hans@email.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          phone: 123456789,
        },
        {
          name: "Sunny Munzer",
          email: "sunny@email.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          phone: 123456789,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
