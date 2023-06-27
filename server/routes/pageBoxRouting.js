import { Router } from "express";
import { deleteBox, getPageBox, postBox, updateBox } from "../controllers/pageBoxController.js";

const pageBox = Router();

pageBox.get("/:id", getPageBox);

pageBox.post("/", postBox)

pageBox.put("/:id", updateBox)

pageBox.delete("/:id",deleteBox)

export default pageBox;