import { Router } from 'express';
import { userController } from './main';

const userRouter = Router();

userRouter.post('/user', userController.createUser);

export default userRouter;
