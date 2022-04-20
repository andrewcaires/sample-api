import { Router } from "express";

import { login, logout, user } from "../controllers/auth";

import { auth } from "../middlewares/auth";

import { queryValidation } from "../validation/auth";

const router = Router();

router.get("/", auth, user);

router.post("/login", queryValidation, login);

router.get("/logout", auth, logout);

export default router;
