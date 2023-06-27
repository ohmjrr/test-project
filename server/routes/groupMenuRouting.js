import { Router } from "express";
import { deleteMenu, getAllMenu, getMenuFilter, updateMenu } from "../controllers/groupMenuController.js";
import { getMenu } from "../controllers/groupMenuController.js";
import { postMenu } from "../controllers/groupMenuController.js";


const menu = Router()

menu.get("/all", getAllMenu);

menu.get("/", getMenu)

menu.get('/filter',getMenuFilter)

menu.post("/", postMenu)

menu.put("/:id",updateMenu)

menu.delete("/:id",deleteMenu)

export default menu;