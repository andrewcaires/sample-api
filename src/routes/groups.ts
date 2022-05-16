import { Router } from "express";

import { add, all, del, get, routesAll, routesSet, set } from "../controllers/groups";

import { auth } from "../middlewares/auth";
import { permission } from "../middlewares/permission";

import { createValidation, routesValidation, updateValidation } from "../validation/groups";

const router = Router();

router.use(auth);

router.get("/", permission("groups.read"), all);

router.post("/", permission("groups.write"), createValidation, add);

router.route("/:id")

  .get(permission("groups.read"), get)

  .put(permission("groups.write"), updateValidation, set)

  .delete(permission("groups.write"), del);

router.route("/:id/routes")

  .get(permission("groups.read"), routesValidation, routesAll)

  .put(permission("groups.write"), routesValidation, routesSet);

export default router;
