import { Injectable, NestMiddleware, Post, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { secretKey } from 'src/env';
import * as jwt from 'jsonwebtoken'


@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      jwt.verify(token, secretKey);
      next();
    } catch (error) {
      throw new UnauthorizedException("invalid token")
    }
  }
}