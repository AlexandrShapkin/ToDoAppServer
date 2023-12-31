import { Router } from "express";
import {
  registration,
  login,
  logout,
  refresh,
} from "../controllers/user-controller";
import { body } from "express-validator";
import authMiddleware from "../middlewares/auth-middleware";

import { tasks } from "./tasks";

export const router: Router = Router();

router.post(
  "/registration",
  body("username").isLength({ min: 4, max: 16 }),
  body("password").isLength({ min: 4, max: 32 }),
  registration
);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);

router.use("/tasks", authMiddleware, tasks);
