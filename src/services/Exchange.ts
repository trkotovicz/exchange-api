import Exchange from '../models/Exchange';
import fetchExchangeApi from '../utils/fetchExchangeApi';
import { transcationSchema } from '../utils/validations';

export default class ExchangeService {
  listExchanges = async () => {
    const exchange = await fetchExchangeApi();
    return exchange;
  }

  createTransaction = async (base: string, originalValue: number, exchangeCoin: string, userId: number) => {
    transcationSchema({ base, originalValue, exchangeCoin });
    const exchangeRate = await this.listExchanges();
    const createTransaction = await Exchange.create({
      userId,
      base,
      originalValue,
      exchangeCoin,
      exchangedValue: exchangeRate.rates[exchangeCoin] * originalValue,
      rate: exchangeRate.rates[exchangeCoin]
    });

    return createTransaction;
  }

  listAllTransactions = async (userId: number) => {
    const transactions = await Exchange.findAll({ where: { userId } });
    return transactions;
  }
}