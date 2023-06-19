import { db } from "../utils/db.js";

export const getMenu = async (req, res) => {
  const data = await db.collection("userGroupMenuConfig").find({}).toArray();

  return res.json({
    data: data,
  });
};
