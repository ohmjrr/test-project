import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

export const getPageBox = async (req, res) => {
  const id = req.params.id;
  const data = await db
    .collection("userPageBoxConfig")
    .find({ pageChildId: new ObjectId(id) })
    .toArray();

  return res.json({
    data: data,
  });
};

export const postBox = async (req, res) => {
console.log(req.body);
  const data = {
    pageChildId: new ObjectId(req.body.id),
    pageInfo: {
      header: req.body.data.name,
      partment: req.body.data.department,
      dtl: req.body.data.detail,
    },
    activeFlg: req.body.data.active,
  };

  const collection = db.collection("userPageBoxConfig");

  await collection.insertOne(data);

  return res.json({
    message: "Success",
  });
};

export const updateBox = async (req, res) => {
  
  const id = req.params.id;

  const data = {
    pageChildId: new ObjectId(req.body.id),
    pageInfo: {
      header: req.body.data.name,
      partment: req.body.data.department,
      dtl: req.body.data.detail,
    },
    activeFlg: req.body.data.active,
  };

  const collection = db.collection("userPageBoxConfig");

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });

  return res.json({ message: "updated successfully" });
};




export const deleteBox = async (req, res) => {
  
  const id  = req.params.id;

  await db.collection("userPageBoxConfig").deleteOne({_id : new ObjectId(id)});

  return res.json({
    message: "Successfully"
  })
}