// App.js - Updated for Screenshot-Matching Vortex Spinner

import React, { useState, useRef } from 'react';
import './Wheel.css';

const segments = ['3.9X', '2.5X', '1.55X', '12.5X', '7.7X', '28X', '52X', '85X', '27.5X', '10X', '13.3X', '44X', '200X', '+20.5X', 'BONUS', '+7X'];

export default function App() {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef();

  const spin = () => {
    if (spinning) return;
    const segAngle = 360 / segments.length;
    const index = Math.floor(Math.random() * segments.length);
    const rotation = 360 * 5 + (index * segAngle) + segAngle / 2; // Offset fixed
    setAngle(prev => prev + rotation);
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setResult(segments[index]);
    }, 4000);
  };

  return (
    <div className="vortex-container">
      <div className="vortex-title">VORTEX</div>
      <div className="wheel-wrapper">
        <div className="pointer" />
        <div
          className="wheel"
          ref={wheelRef}
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <svg className="wheel-svg" viewBox="0 0 200 200">
            {segments.map((label, i) => {
              const r = (360 / segments.length) * i;
              const x = 100 + 80 * Math.cos((r - 90) * Math.PI / 180);
              const y = 100 + 80 * Math.sin((r - 90) * Math.PI / 180);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  transform={`rotate(${r}, ${x}, ${y})`}
                >
                  {label}
                </text>
              );
            })}
          </svg>
        </div>
        <div className="center-button">☁</div>
      </div>
      <button className="spin-btn" onClick={spin} disabled={spinning}>
        {spinning ? 'Spinning...' : 'HOLD TO SPIN'}
      </button>
      <div className="balance">Balance: ₹0</div>
      {result && <div className="result">You got: {result}</div>}
    </div>
  );
}
