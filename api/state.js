import { Money } from "../models/index";
export default async (req, res) => {
  res.json(
    (await Money.findAll({ raw: true })).map(({ label, amount, value }) => ({
      label,
      amount,
      value: parseInt(value),
    }))
  );
};
