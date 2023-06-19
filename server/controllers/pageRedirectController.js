import { db } from "../utils/db.js";

export const getPageRedirect = async (req, res) => {
  const data = await db.collection("userPageRedirectConfig").find({}).toArray();

  return res.json({
    data: data,
  });
};
