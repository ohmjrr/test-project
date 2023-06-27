import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

export const getPageRedirect = async (req, res) => {
  const id = req.params.id;
  const data = await db
    .collection("userPageRedirectConfig")
    .find({ pageBoxId: new ObjectId(id) })
    .toArray();

  return res.json({
    data: data,
  });
};

export const postScreen = async (req, res) => {
  const data = {
    pageBoxId: new ObjectId(req.body.id),
    pageInfo: {
      header: req.body.data.name,
      redirectURL: req.body.data.redirectURL,
      subgroup: req.body.data.subgroup,
    },
    activeFlg: req.body.data.active,
  };

  const collection = db.collection("userPageRedirectConfig");

  await collection.insertOne(data);

  return res.json({
    message: "success",
  });
};


export const updateScreen = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const data = {
    pageBoxId: new ObjectId(req.body.id),
    pageInfo: {
      header: req.body.data.name,
      redirectURL: req.body.data.url,
      subgroup: req.body.data.supgroup,
    },
    activeFlg: req.body.data.active,
  };
  console.log(data);

  const collection = db.collection("userPageRedirectConfig");

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });

  return res.json({ message: "updated successfully" });
};


export const deleteScreen = async (req, res) => {
  
  const id  = req.params.id;

  await db.collection("userPageRedirectConfig").deleteOne({_id : new ObjectId(id)});

  return res.json({
    message: "Successfully"
  })
}