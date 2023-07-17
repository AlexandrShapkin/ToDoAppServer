import express, { Express, Request, Response } from "express";
import { Router } from "express";

const router = Router();

router.post("/registration");
router.post("/login");
router.post("/logout");
