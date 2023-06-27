import { Router } from "express";
import { deletedChild, getChildFilter, getPageChild, postChild, updateChild,  } from "../controllers/pageChildController.js";

const pageChild = Router();

pageChild.get("/:id", getPageChild);

pageChild.get("/filter",getChildFilter)

pageChild.post("/", postChild);

pageChild.put("/:id", updateChild);

pageChild.delete("/:id", deletedChild)

export default pageChild;
