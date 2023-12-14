import React, { useState } from "react";
import "./App.css";

function roundAmount(amount) {
  if (amount < 30000) {
    return Math.round(amount / 100) * 100;
  } else if (amount >= 30000 && amount < 100000) {
    return Math.round(amount / 500) * 500;
  } else {
    return Math.round(amount / 1000) * 1000;
  }
}

function calculateCompoundInterest(principal, interestRate, time) {
  const rate = parseFloat(interestRate) / 100;
  let amount = parseFloat(principal) * Math.pow(1 + rate, parseFloat(time));
  let interest = amount - parseFloat(principal);

  amount = roundAmount(amount).toLocaleString();
  interest = roundAmount(interest).toLocaleString();

  return {
    amount: amount,
    interest: interest,
  };
}

function calculateCompoundInterestWithMonthlyDeposit(
  principal,
  monthlyDeposit,
  interestRate,
  time
) {
  const rate = interestRate / 100;
  let totalAmount = principal;

  for (let i = 0; i < time * 12; i++) {
    totalAmount *= 1 + rate / 12;
    totalAmount += parseFloat(monthlyDeposit);
  }

  const interest = totalAmount - principal - monthlyDeposit * time * 12;

  return {
    amount: roundAmount(totalAmount).toLocaleString(),
    interest: roundAmount(interest).toLocaleString(),
  };
}

function App() {
  const [principal, setPrincipal] = useState(0);
  const [monthlyDeposit, setMonthlyDeposit] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [time, setTime] = useState(0);
  const [calculatedAmount, setCalculatedAmount] = useState("0");
  const [calculatedInterest, setCalculatedInterest] = useState("0");

  const handleInputChange = (setStateFunction) => (event) => {
    setStateFunction(event.target.value);
  };

  const handleSliderChange = (setStateFunction) => (event) => {
    setStateFunction(event.target.value);
  };

  const calculateInterest = () => {
    if (monthlyDeposit > 0) {
      const result = calculateCompoundInterestWithMonthlyDeposit(
        principal,
        monthlyDeposit,
        interestRate,
        time
      );
      setCalculatedAmount(result.amount);
      setCalculatedInterest(result.interest);
    } else {
      const result = calculateCompoundInterest(principal, interestRate, time);
      setCalculatedAmount(result.amount);
      setCalculatedInterest(result.interest);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-heading">Ränta på ränta uträknare</h1>
      <form className="app-form">
        {/* Principal */}
        <div className="input-group">
          <label>Ditt kapital just nu</label>
          <div className="slider-input">
            <input
              type="range"
              min="0"
              max="100000"
              value={principal}
              onChange={handleSliderChange(setPrincipal)}
              step="1000"
            />
            <div className="input-wrapper">
              <input
                type="text"
                value={principal}
                onChange={handleInputChange(setPrincipal)}
              />
              <span className="unit">kr</span>
            </div>
          </div>
        </div>

        {/* Monthly Deposit */}
        <div className="input-group">
          <label>Månadssparande</label>
          <div className="slider-input">
            <input
              type="range"
              min="0"
              max="20000"
              value={monthlyDeposit}
              onChange={handleSliderChange(setMonthlyDeposit)}
              step="100"
            />
            <div className="input-wrapper">
              <input
                type="text"
                value={monthlyDeposit}
                onChange={handleInputChange(setMonthlyDeposit)}
              />
              <span className="unit">kr</span>
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="input-group">
          <label>Avkastning/Ränta</label>
          <div className="slider-input">
            <input
              type="range"
              min="0"
              max="20"
              value={interestRate}
              onChange={handleSliderChange(setInterestRate)}
              step="1"
            />
            <div className="input-wrapper">
              <input
                type="text"
                value={interestRate}
                onChange={handleInputChange(setInterestRate)}
              />
              <span className="unit">%</span>
            </div>
          </div>
        </div>

        {/* Time */}
        <div className="input-group">
          <label>Spartid</label>
          <div className="slider-input">
            <input
              type="range"
              min="0"
              max="50"
              value={time}
              onChange={handleSliderChange(setTime)}
              step="1"
            />
            <div className="input-wrapper">
              <input
                type="text"
                value={time}
                onChange={handleInputChange(setTime)}
              />
              <span className="unit">år</span>
            </div>
          </div>
        </div>
      </form>
      <button className="app-button" onClick={calculateInterest}>
        Beräkna
      </button>
      <p className="app-result">
        <span className="result-label">Kapital:</span> {calculatedAmount}
      </p>
      <p className="app-result">
        <span className="result-label">Vinst:</span> {calculatedInterest}
      </p>
    </div>
  );
}

export default App;
