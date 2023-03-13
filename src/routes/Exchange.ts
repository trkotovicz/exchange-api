import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { exchangeController } from './main';

const exchangeRouter = Router();

exchangeRouter.use(authMiddleware);

exchangeRouter.get('/exchange', exchangeController.listExchanges);

export default exchangeRouter;
