import User from '../models/User';

export default class UserService {
  createUser = async (username: string, password: string) => {
    const user = await User.create({ username, password });
    if (!user) throw Error('ConflictError');
    return user;
  }

  getUserById = async (id: number) => {
    const user = await User.findByPk(id);
    if (!user) throw Error('EntityNotFound');
    return user;
  }

  getUserByUsername = async (username: string) => {
    const user = await User.findOne({ where: { username } });
    if (!user) throw Error('EntityNotFound');
    return user;
  }
}
