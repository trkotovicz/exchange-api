import md5 from 'md5';
import User from '../models/User';
import { userSchema } from '../utils/validations';

export default class UserService {
  createUser = async (username: string, password: string): Promise<User> => {
    userSchema({ username, password });
    const user = await User.create({ username, password: md5(password) });
    if (!user) throw Error('ConflictError');
    return user;
  }

  getUserById = async (id: number) => {
    const user = await User.findByPk(id);
    if (!user) throw Error('EntityNotFound');
    return user;
  }

  getUserByUsername = async (username: string): Promise<User> => {
    const user = await User.findOne({ where: { username } });
    if (!user) throw Error('EntityNotFound');
    return user;
  }

  login = async (username: string, password: string) => {
    const user = await this.getUserByUsername(username);
    if (!user || user.password !== md5(password)) {
      throw Error('UnauthorizedError');
    }
    return { id: user.id, username: user.username }
  }
}
