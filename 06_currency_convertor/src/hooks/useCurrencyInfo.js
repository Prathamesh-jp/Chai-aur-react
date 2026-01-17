import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchRates() {
      try {
        const res = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        );
        const json = await res.json();

        if (!ignore) {
          setData(json[currency]);
        }
      } catch (err) {
        console.error("Currency fetch failed:", err);
        setData(null);
      }
    }

    fetchRates();

    return () => {
      ignore = true;
    };
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
