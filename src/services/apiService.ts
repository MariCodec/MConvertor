import { ExchangeRatesResponse } from "../types/api";

export const getExchangeRates = async (
  baseCurrency: string = "UAH"
): Promise<ExchangeRatesResponse> => {
  const response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
  );

  if (!response.ok) {
    throw new Error("Error fetching exchange rates");
  }
  const data: ExchangeRatesResponse = await response.json();
  return data;
};
