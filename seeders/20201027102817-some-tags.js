"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tags",
      [
        {
          title: "Work",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Personal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Dev",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "School",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Homework",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Urgent",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
