import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorTypes } from '../errors/catalog';

interface AuthRequest extends Request {
  userId: string;
}

interface DecodedToken {
  id: string;
  // outras propriedades do payload do token, se houver
}

const secret = process.env.JWT_SECRET as string;

export default function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {  
  const token = req.cookies?.token ?? null;

  if (!token) {
    throw new Error(ErrorTypes.InvalidToken);
  }

  jwt.verify(token, secret, (err: jwt.JsonWebTokenError, decoded: DecodedToken) => {
    if (err) throw new Error(ErrorTypes.InvalidToken);

    req.userId = decoded.id;
    next();
  });
} 

// https://github.com/expressjs/cookie-parser
