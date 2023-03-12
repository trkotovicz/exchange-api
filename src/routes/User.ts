import { Router } from 'express';
import { userController } from './main';

const userRouter = Router();

userRouter.post('/user', userController.createUser);
userRouter.get('/user/:id', userController.getUserById);
userRouter.get('/user', userController.getUserByUsername);

export default userRouter;
