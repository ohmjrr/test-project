import { Router } from "express";
import { getPageBox } from "../controllers/pageBoxController.js";

const pageBox = Router();

pageBox.get("/", getPageBox);

export default pageBox;