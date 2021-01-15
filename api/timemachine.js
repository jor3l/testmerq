import { Event, Money } from "../models/index";
import { Op } from "sequelize";

export default async (req, res) => {
  if (!("date" in req.query)) return res.status(500).send("DATE_MISSING");

  // Initialize:
  let state = (await Money.findAll({ raw: true })).map((m) => ({
    id: m.id,
    label: m.label,
    amount: 0,
    value: parseInt(m.value),
  }));

  const events = await Event.findAll({
    where: { created_at: { [Op.lte]: req.query.date } },
    order: [["created_at", "ASC"]],
    raw: true,
  });

  // Playback the events
  events.forEach((event) => {
    let index = state.findIndex((m) => m.id === event.money_id);
    switch (event.type) {
      case "ADD":
        state[index].amount += event.amount;
      case "REMOVE":
        state[index].amount -= event.amount;
      case "SET":
        state[index].amount = event.amount;
    }
  });

  res.json(state.map(({ label, amount, value }) => ({ label, amount, value })));
};
