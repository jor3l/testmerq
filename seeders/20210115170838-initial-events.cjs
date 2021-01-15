"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("events", [
      {
        money_id: 0,
        amount: 0,
        type: "INIT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        money_id: 1,
        amount: 0,
        type: "INIT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        money_id: 2,
        amount: 0,
        type: "INIT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        money_id: 3,
        amount: 0,
        type: "INIT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        money_id: 4,
        amount: 0,
        type: "INIT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        money_id: 5,
        amount: 0,
        type: "INIT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        money_id: 6,
        amount: 0,
        type: "INIT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        money_id: 7,
        amount: 0,
        type: "INIT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        money_id: 8,
        amount: 0,
        type: "INIT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        money_id: 9,
        amount: 0,
        type: "INIT",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Money", null, {});
  },
};
