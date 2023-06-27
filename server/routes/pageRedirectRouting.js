import { Router } from "express";
import { deleteScreen, getPageRedirect, postScreen, updateScreen } from "../controllers/pageRedirectController.js";

const pageRedirect = Router();

pageRedirect.get("/:id", getPageRedirect);

pageRedirect.post("/",postScreen)

pageRedirect.put("/:id",updateScreen)

pageRedirect.delete("/:id", deleteScreen)

export default pageRedirect;