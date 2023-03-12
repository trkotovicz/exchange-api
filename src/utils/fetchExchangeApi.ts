import 'dotenv/config';

const API_KEY = process.env.API_KEY;

const myHeaders = new Headers();

myHeaders.append("apikey", String(API_KEY));

const requestOptions = {
  method: 'GET',
  redirect: 'follow' as RequestRedirect | undefined,
  headers: myHeaders
};

const SYMBOLS = 'BRL,USD,EUR,JPY';
const BASE = 'EUR';

const fetchExchangeApi = async () => {
  const url = `https://api.apilayer.com/exchangerates_data/latest?symbols=${SYMBOLS}&base=${BASE}`
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
}

export default fetchExchangeApi;
