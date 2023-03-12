import User from '../models/User';

export default class UserService {
  createUser = async (username: string, password: string) => {
    const user = await User.create({
      username,
      password,
    });
    return user;
  }

  // static async getUserById(id: number) {
  //   const user = await User.findByPk(id);
  //   return user;
  // }

  // static async getUserByUsername(username: string) {
  //   const user = await User.findOne({ where: { username } });
  //   return user;
  // }
}
