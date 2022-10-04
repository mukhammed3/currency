import React, { useState, useEffect } from "react";

const KEY = "a4075576fd-13b7171873-rj6icg";
const USD_UAH = `https://api.fastforex.io/convert?from=USD&to=UAH&amount=1&api_key=${KEY}`;
const EUR_UAH = `https://api.fastforex.io/convert?from=EUR&to=UAH&amount=1&api_key=${KEY}`;

const Header = () => {
  const [usdToUah, setUsdToUah] = useState();
  const [eurToUah, setEurToUah] = useState();

  useEffect(() => {
    fetch(USD_UAH)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result.UAH);
        setUsdToUah(data.result.UAH);
      });
  }, []);
  useEffect(() => {
    fetch(EUR_UAH)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result.UAH);
        setEurToUah(data.result.UAH);
      });
  }, []);

  return (
    <>
      <div className="live-currency">
        <p className="live-currency__item">1 USD = {usdToUah} UAH</p>
        <p className="live-currency__item">1 EUR = {eurToUah} UAH</p>
      </div>
    </>
  );
};

export default Header;
