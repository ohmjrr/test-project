import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

export const getPageBox = async (req, res) => {
  const data = await db
    .collection("userPageBoxConfig")
    .find({ pageChildId: new ObjectId(req.query.id) })
    .toArray();

  return res.json({
    data: data,
  });
};
