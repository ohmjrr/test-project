import { Router } from "express";
import { getPageChild } from "../controllers/pageChildController.js";

const pageChild = Router();

pageChild.get("/", getPageChild);

export default pageChild;
