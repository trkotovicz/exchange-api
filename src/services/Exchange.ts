import fetchExchangeApi from "../utils/fetchExchangeApi"

export default class ExchangeService {
  listExchanges = async () => {
    const exchange = await fetchExchangeApi();
    return exchange;
  }
}