import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

export const getPageChild = async (req, res) => {
  const data = await db
    .collection("userPageChildConfig")
    .find({groupMenuId: new ObjectId(req.query.id)})
    .toArray();

  return res.json({
    data: data
  });
};
