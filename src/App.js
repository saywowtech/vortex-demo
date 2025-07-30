import React, { useState } from 'react';
import './Wheel.css'; // Make sure this file is saved exactly as your canvas

const App = () => {
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(100);
  const [result, setResult] = useState('');

  const handleSpin = () => {
    if (spinning || balance < 10) return;
    setSpinning(true);
    setBalance(prev => prev - 10);
    setResult('');

    // Simulate spin delay
    setTimeout(() => {
      const reward = Math.floor(Math.random() * 50) + 10;
      setResult(`You won ${reward} coins!`);
      setBalance(prev => prev + reward);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="vortex-container">
      <h1 className="vortex-title">VORTEX</h1>

      <div className="wheel-wrapper">
        <div className="pointer"></div>

        <div className="wheel">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
          <div className="center-button">V</div>
        </div>
      </div>

      <button
        className="spin-btn"
        onClick={handleSpin}
        disabled={spinning || balance < 10}
      >
        {spinning ? 'Spinning...' : 'HOLD TO SPIN'}
      </button>

      <div className="balance">Balance: {balance} coins</div>
      {result && <div className="result">{result}</div>}
    </div>
  );
};

export default App;
