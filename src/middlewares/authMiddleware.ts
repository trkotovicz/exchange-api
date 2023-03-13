import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import JwtService from '../services/jwtService';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Token' });
  }

  // o token de autorização é enviado no formato 'Bearer <token>'
  // o split separa a string em dois e o primeiro elemento `Bearer` não será utilizado
  // A desestruturação permite que o segundo elemento `token` seja atribuído diretamente à variável token
  const [token] = authorization.split(' ');

  try {
    JwtService.validateToken(token);
    return next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Token' });
  }
}
