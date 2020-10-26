"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "todoLists",
      [
        {
          name: "House Chores",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Codaisseur",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Shopping",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Paperwork",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("todoLists", null, {});
  },
};
