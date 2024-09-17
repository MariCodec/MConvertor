import styles from "./Header.module.scss";
import { GiEuropeanFlag } from "react-icons/gi";
import { IoLogoUsd } from "react-icons/io";
import { getExchangeRates } from "../../services/apiService";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [usdRate, setUsdRate] = useState<number | null>(null);
  const [eurRate, setEurRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getExchangeRates();

        setUsdRate(1 / data.rates["USD"]);
        setEurRate(1 / data.rates["EUR"]);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchRates();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="./icon.png" alt="logo" />
      </div>
      <div className={styles.currency}>
        <div>
          <IoLogoUsd className={`${styles.icon} ${styles.iconDollar}`} />
          <span className={styles.label}>
            USD: {usdRate !== null ? usdRate.toFixed(2) : "Loading..."}
          </span>
          <span className={styles.rate}></span>
        </div>
        <div>
          <GiEuropeanFlag className={`${styles.iconEuro} ${styles.icon}`} />
          <span className={styles.label}>
            EUR: {eurRate !== null ? eurRate.toFixed(2) : "Loading..."}
          </span>
          <span className={styles.rate}></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
