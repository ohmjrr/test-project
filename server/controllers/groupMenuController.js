import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

export const getAllMenu = async (req, res) => {
  // const data = await db.collection("userGroupMenuConfig").find({}).toArray();
  const data = await db
    .collection("userGroupMenuConfig")
    .aggregate([
      {
        $lookup: {
          from: "userPageChildConfig",
          let: { ref: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$groupMenuId", "$$ref"] } },
            },
            {
              $lookup: {
                from: "userPageBoxConfig",
                let: { ref: "$_id" },
                pipeline: [
                  {
                    $match: { $expr: { $eq: ["$pageChildId", "$$ref"] } },
                  },
                  {
                    $lookup: {
                      from: "userPageRedirectConfig",
                      localField: "_id",
                      foreignField: "pageBoxId",
                      as: "screenList",
                    },
                  },
                ],
                as: "boxList",
              },
            },
          ],
          as: "menuList",
        },
      },
      {
        $project: {
          _id: 0,
          name: "$headerName",
          header: "headerName",
          id: "$_id",
          children: {
            $map: {
              input: "$menuList",
              as: "menu",
              in: {
                name: "$$menu.subMenuName",
                header: "subMenuName",
                id: "$$menu._id",
                children: {
                  $map: {
                    input: "$$menu.boxList",
                    as: "box",
                    in: {
                      name: "$$box.pageInfo.header",
                      header: "boxName",
                      id: "$$box._id",
                      children: {
                        $map: {
                          input: "$$box.screenList",
                          as: "screen",
                          in: {
                            name: "$$screen.pageInfo.header",
                            header: "screenName",
                            id: "$$screen._id",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ])
    .toArray();

  return res.json({
    data: data,
  });
};

export const getMenu = async (req, res) => {
  const data = await db.collection("userGroupMenuConfig").find({}).toArray();

  res.json({
    data: data,
  });
};

export const getMenuFilter = async (req, res) => {
  
  const name = req.query.name
  const active = req.query.active

  const data = await db.collection("userGroupMenuConfig").find({ $or: [
    { headerName: name }, 
    { activeFlg: active } 
  ]}).toArray();

  res.json({
    data: data,
  });
};

export const postMenu = async (req, res) => {
  console.log(req.body);
  const data = {
    headerName: req.body.name,
    icon: req.body.icon,
    activeFlg: req.body.active,
  };

  const collection = db.collection("userGroupMenuConfig");

  await collection.insertOne(data);

  return res.json({
    message: "created successfully",
  });
};

export const updateMenu = async (req, res) => {
  const menuId = req.params.id;

  const data = {
    headerName: req.body.name,
    icon: req.body.icon,
    activeFlg: req.body.active,
  };
  const collection = db.collection("userGroupMenuConfig");

  await collection.updateOne({ _id: new ObjectId(menuId) }, { $set: data });

  return res.json({ message: "updated successfully" });
};

export const deleteMenu = async (req, res) => {
  const menuId = req.params.id;
  console.log(menuId);

  const collection = db.collection("userGroupMenuConfig");

  await collection.deleteOne({ _id: new ObjectId(menuId) });

  return res.json({ message: "deleted successfully" });
};
