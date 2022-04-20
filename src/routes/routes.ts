import { Router } from "express";

import { add, all, del, get, set } from "../controllers/routes";

import { auth } from "../middlewares/auth";
import { permission } from "../middlewares/permission";

import { createValidation, updateValidation } from "../validation/routes";

const router = Router();

router.use(auth);

router.get("/", permission("routes.read"), all);

router.post("/", permission("routes.write"), createValidation, add);

router.route("/:id")

  .get(permission("routes.read"), get)

  .put(permission("routes.write"), updateValidation, set)

  .delete(permission("routes.write"), del);

export default router;
