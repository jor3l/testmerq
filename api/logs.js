import { Event } from "../models/index";
export default async (req, res) => {
  let { limit = 50, offset = 0 } = req?.query || {};

  res.json(
    await Event.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["created_at", "DESC"]],
    })
  );
};
