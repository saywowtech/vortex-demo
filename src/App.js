import React, { useState } from 'react';
import './Wheel.css';

const segments = Array.from({ length: 12 }, (_, i) => i + 1); // [1...12]

const App = () => {
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(100);
  const [result, setResult] = useState('');

  const handleSpin = () => {
    if (spinning || balance < 10) return;
    setSpinning(true);
    setBalance((prev) => prev - 10);
    setResult('');

    setTimeout(() => {
      const reward = Math.floor(Math.random() * 50) + 10;
      setResult(`You won ${reward} coins!`);
      setBalance((prev) => prev + reward);
      setSpinning(false);
    }, 4000);
  };

  const renderRing = (radius, duration, className) => (
    <svg
      className={`ring-svg ${className}`}
      viewBox="0 0 200 200"
      style={{
        animationDuration: duration,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(0deg)',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {segments.map((num, i) => {
        const angle = (360 / segments.length) * i;
        const rad = (angle * Math.PI) / 180;
        const x = 100 + radius * Math.cos(rad);
        const y = 100 + radius * Math.sin(rad);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#00ffff"
            fontSize="14"
            fontWeight="bold"
          >
            {num}
          </text>
        );
      })}
    </svg>
  );

  return (
    <div className="vortex-container">
      <h1 className="vortex-title">VORTEX</h1>

      <div className="wheel-wrapper">
        <div className="pointer"></div>
        <div className="wheel">
          {renderRing(85, '6s', 'ring-1')}
          {renderRing(65, '4s', 'ring-2')}
          {renderRing(45, '3s', 'ring-3')}
          <div className="center-button">V</div>
        </div>
      </div>

      <button className="spin-btn" onClick={handleSpin} disabled={spinning || balance < 10}>
        {spinning ? 'Spinning...' : 'HOLD TO SPIN'}
      </button>

      <div className="balance">Balance: {balance} coins</div>
      {result && <div className="result">{result}</div>}
    </div>
  );
};

export default App;
