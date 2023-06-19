import { Router } from "express";
import { getMenu } from "../controllers/groupMenuController.js";


const menu = Router()

menu.get("/", getMenu);


export default menu;