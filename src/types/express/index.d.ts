import { DecodedTokenPayload } from "../../service/token-service";

declare module "express-serve-static-core" {
  export interface Request {
    user?: DecodedTokenPayload;
  }
}