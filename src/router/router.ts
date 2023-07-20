import { Router } from "express";
import { registration } from "../controllers/user-controller";
import { body } from "express-validator";

export const router = Router();

router.post(
  "/registration",
  body("username").isLength({ min: 4, max: 16 }),
  body("password").isLength({ min: 4, max: 32 }),
  registration
);
router.post("/login");
router.post("/logout");
