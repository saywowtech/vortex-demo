import React, { useState, useRef } from 'react';
import './Wheel.css';

const segments = Array.from({ length: 12 }, (_, i) => i + 1);

const App = () => {
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(100);
  const [result, setResult] = useState('');
  const ringRefs = [useRef(null), useRef(null), useRef(null)];

  const handleSpin = () => {
    if (spinning || balance < 10) return;

    setSpinning(true);
    setBalance(prev => prev - 10);
    setResult('');

    const baseDeg = 360;
    const rotations = [
      baseDeg * 5 + Math.floor(Math.random() * baseDeg),
      baseDeg * 6 + Math.floor(Math.random() * baseDeg),
      baseDeg * 7 + Math.floor(Math.random() * baseDeg)
    ];

    ringRefs.forEach((ref, idx) => {
      if (ref.current) {
        ref.current.style.transition = `transform 4s ease-out`;
        ref.current.style.transform = `rotate(${rotations[idx]}deg)`;
      }
    });

    const reward = Math.floor(Math.random() * 40) + 10;
    setTimeout(() => {
      setResult(`You won ${reward} coins!`);
      setBalance(prev => prev + reward);
      setSpinning(false);
    }, 4000);
  };

  const renderNumbers = (radius, offset = 0) => {
    return segments.map((num, i) => {
      const angle = ((360 / segments.length) * i + offset - 90) * (Math.PI / 180);
      const x = 160 + radius * Math.cos(angle);
      const y = 160 + radius * Math.sin(angle);
      return (
        <text
          key={`${radius}-${num}`}
          x={x}
          y={y}
          fill="#00ffff"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fontWeight="bold"
        >
          {num}
        </text>
      );
    });
  };

  return (
    <div className="vortex-container">
      <h1 className="vortex-title">VORTEX</h1>

      <div className="wheel-wrapper">
        <div className="pointer"></div>

        <div className="wheel">
          <svg ref={ringRefs[0]} className="ring-svg ring-1" viewBox="0 0 320 320">
            {renderNumbers(120)}
          </svg>
          <svg ref={ringRefs[1]} className="ring-svg ring-2" viewBox="0 0 320 320">
            {renderNumbers(90, 15)}
          </svg>
          <svg ref={ringRefs[2]} className="ring-svg ring-3" viewBox="0 0 320 320">
            {renderNumbers(60, 30)}
          </svg>
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
