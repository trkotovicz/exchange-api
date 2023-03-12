import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/User';

export default class UserController {
  constructor(private userService: UserService) {}

  createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await this.userService.createUser(username, password);
    if (!user) throw Error('ConflictError');
    res.status(StatusCodes.CREATED).json(user);
  }

  getUserById = async (req: Request, res: Response) => {
    const user = await this.userService.getUserById(Number(req.params));
    const { id, username } = user;
    res.status(StatusCodes.OK).json({ id, username });
  }

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await this.userService.login(username, password);
    res.status(StatusCodes.OK).json(user);
  }
}
