import { Request } from 'express';
import { IUserJwt } from '../services/jwtService';

export default interface IRequestWithUser extends Request {
  user?: IUserJwt;
}