import { useEffect, useState } from "react";
import { CURRENCIES } from "../../constants/constants";
import styles from "./CurrencyConverter.module.scss";
import { ExchangeRatesResponse } from "../../types/api";

type Props = {
  exchangeRates: Partial<ExchangeRatesResponse["rates"]>;
};

export const CurrencyConverter: React.FC<Props> = ({ exchangeRates }) => {
  
  const [fromCurrency, setFromCurrency] = useState<string>(CURRENCIES[0]);
  const [toCurrency, setToCurrency] = useState<string>(CURRENCIES[1]);

  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  useEffect(() => {
    if (amountInFromCurrency) {
      const toAmount = (
        (parseFloat(fromAmount) * (exchangeRates[toCurrency] ?? 0)) /
        (exchangeRates[fromCurrency] ?? 1)
      ).toFixed(2);
      setToAmount(toAmount);
    } else {
      const fromAmount = (
        (parseFloat(toAmount) * (exchangeRates[fromCurrency] ?? 1)) /
        (exchangeRates[toCurrency] ?? 0)
      ).toFixed(2);
      setFromAmount(fromAmount);
    }
  }, [
    fromAmount,
    toAmount,
    fromCurrency,
    toCurrency,
    exchangeRates,
    amountInFromCurrency,
  ]);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  const handleFromCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  const formatAmount = (amount: string) => (isNaN(+amount) ? "" : amount);

  const conversionText = amountInFromCurrency
    ? `${formatAmount(fromAmount)} ${fromCurrency} = ${formatAmount(
        toAmount
      )} ${toCurrency}`
    : `${formatAmount(toAmount)} ${toCurrency} = ${formatAmount(
        fromAmount
      )} ${fromCurrency}`;

  return (
    <div className={styles.converter}>
      <div className={styles["conversion-text"]}>{conversionText}</div>
      <div>
        <div className={styles["input-container"]}>
          <input
            type="number"
            min="0"
            value={fromAmount}
            onChange={handleFromAmountChange}
          />
        </div>
        <div className={styles["select-container"]}>
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div className={styles["input-container"]}>
          <input
            type="number"
            min="0"
            value={toAmount}
            onChange={handleToAmountChange}
          />
        </div>
        <div className={styles["select-container"]}>
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
