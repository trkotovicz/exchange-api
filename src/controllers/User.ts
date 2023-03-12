import { Request, Response } from 'express';
import UserService from '../services/User';

export default class UserController {
  constructor(private userService: UserService) {}

  createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await this.userService.createUser(username, password);
    res.status(201).json(user);
  }

  // static async getUserById(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const user = await UserService.getUserById(Number(id));
  //   if (user) {
  //     res.json(user);
  //   } else {
  //     res.status(404).json({ message: 'User not found' });
  //   }
  // }

  // static async getUserByUsername(req: Request, res: Response) {
  //   const { username } = req.params;
  //   const user = await UserService.getUserByUsername(username);
  //   if (user) {
  //     res.json(user);
  //   } else {
  //     res.status(404).json({ message: 'User not found' });
  //   }
  // }
}
