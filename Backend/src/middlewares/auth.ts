import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const auth = (...roles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token =
        req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload;

      (req as any).user = decoded;

      if (
        roles.length &&
        !roles.includes(decoded.role)
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
  };
};

export default auth;