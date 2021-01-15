"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.Money);
      Event.addHook("afterCreate", (event) => {
        if (event.type === "ADD") {
          return models.Money.increment("amount", {
            by: event.amount,
            where: {
              id: event.money_id,
            },
          });
        } else if (event.type === "REMOVE") {
          return models.Money.decrement("amount", {
            by: event.amount,
            where: {
              id: event.money_id,
            },
          });
        } else if (event.type === "SET") {
          return models.Money.update(
            { amount: event.amount },
            {
              where: {
                id: event.money_id,
              },
            }
          );
        }
      });
    }
  }

  Event.init(
    {
      money_id: DataTypes.INTEGER,
      type: DataTypes.STRING,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      underscored: true,
      modelName: "Event",
    }
  );
  return Event;
};
