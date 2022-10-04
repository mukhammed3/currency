/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Converter from "./components/Converter";
import Header from "./components/Header";

//logo
import { ReactComponent as ArrowsSvg } from "./svg/arrows.svg";

//links
const KEY = "a4075576fd-13b7171873-rj6icg";
const CURRINCIES = `https://api.fastforex.io/fetch-all?api_key=${KEY}`;

const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  // console.log(currencyOptions);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(CURRINCIES)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.results)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.results)]);
        // console.log(data);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.results[firstCurrency]);
      });
  }, []);

  //for changing values (currencirs)
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `https://api.fastforex.io/fetch-multi?from=${fromCurrency}&to=${toCurrency}&api_key=${KEY}`
      )
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.results[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };
  //
  return (
    <>
      <main className="main">
        <div className="in-main">
          <Header />
          <div className="converters">
            <Converter
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={(e) => setFromCurrency(e.target.value)}
              onChangeAmount={handleFromAmountChange}
              amount={fromAmount}
            />
            <ArrowsSvg className="arrow-svg" />
            <Converter
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={(e) => setToCurrency(e.target.value)}
              onChangeAmount={handleToAmountChange}
              amount={toAmount}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
