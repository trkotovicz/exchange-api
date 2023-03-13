const fetchSymbols = async () => {
  const url = 'https://api.apilayer.com/exchangerates_data/symbols'
  const response = await fetch(url, requestOptions);
  const data = await response.json();

  console.log(data);
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
}

fetchSymbols();