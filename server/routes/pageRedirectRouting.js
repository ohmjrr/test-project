import { Router } from "express";
import { getPageRedirect } from "../controllers/pageRedirectController.js";

const pageRedirect = Router();

pageRedirect.get("/", getPageRedirect);

export default pageRedirect;