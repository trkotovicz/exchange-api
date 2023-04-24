import { Response, NextFunction } from 'express';
import JwtService, { IUserJwt } from '../services/jwtService';
import IRequestWithUser from '../interfaces/IRequestWithUser';

export default function authCookieMiddleware(req: IRequestWithUser, res: Response, next: NextFunction) {
  const userData = req.user;
  const token = JwtService.createToken(userData!);
  
  res.cookie('token', token, {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias em milissegundos
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
  });
  
  next();
}