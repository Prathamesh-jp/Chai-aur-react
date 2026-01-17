import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [result, setResult] = useState(0);

  const rates = useCurrencyInfo(from);
  const options = rates ? Object.keys(rates) : [];

  const convert = () => {
    if (!rates || !rates[to]) return;
    setResult((amount * rates[to]).toFixed(2));
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setResult(amount);
    setAmount(result);
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg')",
      }}
    >
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md p-6 rounded-xl border">
        {!rates && (
          <p className="text-center text-white mb-3">Loading currencies…</p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            onAmountChange={setAmount}
            currencyOptions={options}
            selectCurrency={from}
            onCurrencyChange={setFrom}
            currencyDisable={!rates}
          />

          <div className="relative my-4 h-0.5">
            <button
              type="button"
              onClick={swap}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2
                         bg-blue-600 text-white px-3 py-1 rounded"
            >
              swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={result}
            currencyOptions={options}
            selectCurrency={to}
            onCurrencyChange={setTo}
            amountDisable
            currencyDisable={!rates}
          />

          <button
            type="submit"
            disabled={!rates}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg"
          >
            Convert {from.toUpperCase()} → {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
