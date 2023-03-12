import { Router } from 'express';
import { exchangeController } from './main';

const exchangeRouter = Router();

exchangeRouter.get('/exchange', exchangeController.listExchanges);

export default exchangeRouter;
