import express from "express";
import cors from "cors";
import { client } from "./utils/db.js";
import testRouter from "./routes/test.js";
import menu from "./routes/groupMenuRouting.js";
import pageChild from "./routes/pageChildRouting.js";
import pageBox from "./routes/pageBoxRouting.js";
import pageRedirect from "./routes/pageRedirectRouting.js";


async function init() {
  await client.connect();

  const app = express();
  const port = 4000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // app.use("/test", testRouter);
  app.use("/groupmenu", menu);
  app.use("/child", pageChild);
  app.use("/box",pageBox)
  app.use("/redirect",pageRedirect)

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

init();
