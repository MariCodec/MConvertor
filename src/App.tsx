import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { getExchangeRates } from "./services/apiService";
import { CurrencyConverter } from "./components/CurrencyConverter/CurrencyConverter";
import { ExchangeRatesResponse } from "./types/api";
import { Error } from "./components/error/Error";

function App() {
  const [exchangeRates, setExchangeRates] = useState<
    Partial<ExchangeRatesResponse["rates"]>
  >({});

  const [error, setError] = useState(false);
  const [errorMassage, setErrormassage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ExchangeRatesResponse = await getExchangeRates();
        setExchangeRates(data.rates);
      } catch (error) {
        setError(true);
        setErrormassage(
          `Failed to fetch exchange :${error}  try again later..`
        );
      }
    };
    fetchData();
  }, []);

  return error ? (
    <Error errorMassage={errorMassage} />
  ) : (
    <>
      <Header />
      <CurrencyConverter exchangeRates={exchangeRates} />
    </>
  );
}

export default App;
