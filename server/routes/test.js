import { db } from "../utils/db.js";
import { Router } from "express";
import { ObjectId } from "mongodb";

const testRouter = Router();

testRouter.get("/groupmenu", async (req, res) => {
  const test = await db.collection("userGroupMenuConfig").find({}).toArray();

  return res.json({
    test: test,
  });
});

testRouter.get("/pagechild", async (req, res) => {
  const test = await db
    .collection("userPageChildConfig")
    .findOne({ groupMenuId :new ObjectId("600fb4fadb003698c1bcc335") })
    ;

  return res.json({
    test: test,
  });
});

testRouter.get("/pagebox", async (req, res) => {
  const test = await db.collection("userPageBoxConfig").find({}).toArray();

  return res.json({
    test: test,
  });
});

testRouter.get("/pageredirect", async (req, res) => {
  const test = await db.collection("userPageRedirectConfig").find({}).toArray();

  return res.json({
    test: test,
  });
});
export default testRouter;
