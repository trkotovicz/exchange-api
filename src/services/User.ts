import md5 from 'md5';
import { ErrorTypes } from '../errors/catalog';
import User from '../models/User';
import { userSchema } from '../utils/validations';

export default class UserService {
  createUser = async (username: string, password: string): Promise<User> => {
    userSchema({ username, password });
    const [user, created] = await User.findOrCreate({
      where: { username },
      defaults: { username, password: md5(password)
    } });
    if (!created) throw new Error(ErrorTypes.ConflictError);
    return user;
  }

  getUserById = async (id: number): Promise<User> => {
    const user = await User.findByPk(id);
    if (!user) throw new Error(ErrorTypes.EntityNotFound);
    return user;
  }

  getUserByUsername = async (username: string): Promise<User> => {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error(ErrorTypes.EntityNotFound);
    return user;
  }

  login = async (username: string, password: string) => {
    const user = await this.getUserByUsername(username);
    if (!user || user.password !== md5(password)) {
      throw new Error(ErrorTypes.UnauthorizedError);
    }
    return { id: user.id, username: user.username }
  }
}
