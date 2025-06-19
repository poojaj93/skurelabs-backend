import { Router } from "express";
import { postData } from "../controllers/userControllers.js";

const userRoutes = Router();

userRoutes.post("/postdata", postData);

export default userRoutes;