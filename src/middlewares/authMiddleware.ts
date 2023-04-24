import { Response, NextFunction } from 'express';
import { ErrorTypes } from '../errors/catalog';
import IRequestWithUser from '../interfaces/IRequestWithUser';
import JwtService from '../services/jwtService';

export default function authMiddleware(req: IRequestWithUser, res: Response, next: NextFunction) {  
  // salva o token nos cookies
  const tokenCookie = req.cookies;

  if (!tokenCookie) {
    throw new Error(ErrorTypes.InvalidToken);
  }

  try {
    const userData = JwtService.validateToken(tokenCookie);
    req.user = userData;
    return next();
  } catch (error) {
    throw new Error(ErrorTypes.InvalidToken);
  }
}

// https://github.com/expressjs/cookie-parser
