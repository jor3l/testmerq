"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("money", [
      {
        label: "100000",
        amount: 0,
        value: 100000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "50000",
        amount: 0,
        value: 50000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "20000",
        amount: 0,
        value: 20000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "10000",
        amount: 0,
        value: 10000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "5000",
        amount: 0,
        value: 5000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "1000",
        amount: 0,
        value: 1000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "500",
        amount: 0,
        value: 500,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "200",
        amount: 0,
        value: 200,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "100",
        amount: 0,
        value: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "50",
        amount: 0,
        value: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Money", null, {});
  },
};
