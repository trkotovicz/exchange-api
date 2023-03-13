import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ExchangeService from '../services/Exchange';
import JwtService from '../services/jwtService';

export default class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}

  listExchanges = async (_req: Request, res: Response) => {
    const response = await this.exchangeService.listExchanges();
    res.status(StatusCodes.OK).json(response);
  }

  createTransaction = async (req: Request, res: Response) => {
    const { base, originalValue, exchangeCoin } = req.body;
    const token = req.headers.authorization;
    const tokenPayload = JwtService.validateToken(String(token));

    const response = await this.exchangeService.createTransaction(base, originalValue, exchangeCoin, Number(tokenPayload.id));
    res.status(StatusCodes.CREATED).json(response);
  }
}
