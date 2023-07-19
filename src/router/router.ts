import { Router } from "express";
import { registration } from "../controllers/user-controller";

export const router = Router();

router.post("/registration", registration);
router.post("/login");
router.post("/logout");