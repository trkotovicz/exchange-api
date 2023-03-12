import UserService from '../services/User';
import UserController from '../controllers/User';

const userService = new UserService();
const userController = new UserController(userService);

export { userController };