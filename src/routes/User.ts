import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { userController } from './main';

const userRouter = Router();

userRouter.post('/login', userController.login);
userRouter.post('/user', userController.createUser);

userRouter.use(authMiddleware);

userRouter.get('/user/:id', userController.getUserById);

export default userRouter;
