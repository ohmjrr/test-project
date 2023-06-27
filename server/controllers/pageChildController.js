import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

export const getPageChild = async (req, res) => {
  const id = req.params.id;
  const data = await db
    .collection("userPageChildConfig")
    .find({ groupMenuId: new ObjectId(id) })
    .toArray();

  return res.json({
    data: data,
  });
};

export const getChildFilter = async (req, res) => {
  
  const name = req.query.name
  const active = req.query.active

  const data = await db.collection("userPageChildConfig").find({ $or: [
    { headerName: name }, 
    { activeFlg: active } 
  ]}).toArray();

  res.json({
    data: data,
  });
};

export const postChild = async (req, res) => {
  const data = {
    groupMenuId: new ObjectId(req.body.id),
    subMenuName: req.body.data.name,
    activeFlg: req.body.data.active,
  };

  const collection = db.collection("userPageChildConfig");

  await collection.insertOne(data);

  return res.json({
    message: "Successfully",
  });
};

export const updateChild = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;

  const data = {
    groupMenuId: new ObjectId(req.body.id),
    subMenuName: req.body.data.name,
    activeFlg: req.body.data.active,
  };

  console.log(id);

  const collection = db.collection("userPageChildConfig");

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });

  return res.json({ message: "updated successfully" });
};

export const deletedChild = async (req, res) => {
  
  const id  = req.params.id;

  await db.collection("userPageChildConfig").deleteOne({_id : new ObjectId(id)});

  return res.json({
    message: "Successfully"
  })
}
