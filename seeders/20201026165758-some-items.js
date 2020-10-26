"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "todoItems",
      [
        {
          task: "Clean Cat",
          deadline: "Today",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Clean Self",
          deadline: "Tomorrow",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Clean Underwear",
          deadline: "Friday",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("todoItems", null, {});
  },
};
