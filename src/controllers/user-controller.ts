import { Express, Request, Response } from "express";
import * as UserService from "../service/user-service";

export async function registration(req: Request, res: Response, next: any) {
  const { username, password } = req.body;

  const userData = await UserService.registration(username, password);

  res.cookie("refreshToken", userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  console.log(userData);
  return res.json(userData);
}
