import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ExchangeService from '../services/Exchange';

export default class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}

  listExchanges = async (req: Request, res: Response) => {
    const response = await this.exchangeService.listExchanges();
    res.status(StatusCodes.OK).json(response);
  }
}