import { Request, Response, NextFunction } from "express";
import * as UserService from "../service/user-service";

/**
 * Registration endpoint handler.
 * @param {Request} req express Request
 * @param {Response} res express Response
 * @param {NextFunction} next express NextFunction
 * @returns {Promise<Response<any, Record<string, any>>>} Response JSON
 * `{  
 *    accessToken: string;  
      refreshToken: string;  
      userDto: UserDto;  
    }`
 */
export async function registration(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
  try {
    const { username, password } = req.body;

    const userData = await UserService.registration(username, password);
  
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    console.log(userData);
    return res.json(userData);
  } catch (err) {
    next(err);
  }
}
