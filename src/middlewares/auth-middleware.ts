import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/api-error";
import { verifyAccessToken } from "../service/token-service";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      if (!authorizationHeader) {
        return next(UnauthorizedError());
      }
    }

    const userData = verifyAccessToken(accessToken);
    if (!userData) {
      return next(UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (err) {
    return next(UnauthorizedError);
  }
}