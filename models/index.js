import Sequelize from "sequelize";
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME || "mysql",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "mysql",
  {
    host: process.env.DB_HOST || "testdb",
    dialect: process.env.DB_TYPE || "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: process.env.NODE_ENV === "test" && false,
  }
);

import EventModel from "./event.js";
import MoneyModel from "./money.js";

let Event = new EventModel(sequelize, Sequelize.DataTypes);
let Money = new MoneyModel(sequelize, Sequelize.DataTypes);

let models = {
  Event,
  Money,
};

Event.associate && Event.associate(models);

export { Event, Money, sequelize, Sequelize };
