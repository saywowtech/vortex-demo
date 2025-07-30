// App.js - Multi-Ring Vortex Spinner (All 3 Rings, Visible Circles + Independent Spin)

import React, { useState, useRef } from 'react';
import './Wheel.css';

const outerSegments = ['52X', '85X', '27.5X', '10X', '13.3X', '44X', '200X', 'BONUS'];
const middleSegments = ['3.9X', '2.5X', '1.55X', '12.5X', '7.7X', '28X', '+20.5X', '+7X'];
const innerSegments = ['1X', '2X', '5X', '10X'];

export default function App() {
  const [angleOuter, setAngleOuter] = useState(0);
  const [angleMiddle, setAngleMiddle] = useState(0);
  const [angleInner, setAngleInner] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spin = () => {
    if (spinning) return;

    const randomIndexOuter = Math.floor(Math.random() * outerSegments.length);
    const randomIndexMiddle = Math.floor(Math.random() * middleSegments.length);
    const randomIndexInner = Math.floor(Math.random() * innerSegments.length);

    const outerSegAngle = 360 / outerSegments.length;
    const middleSegAngle = 360 / middleSegments.length;
    const innerSegAngle = 360 / innerSegments.length;

    const rotationOuter = 360 * 5 + (randomIndexOuter * outerSegAngle) + outerSegAngle / 2;
    const rotationMiddle = 360 * 5 + (randomIndexMiddle * middleSegAngle) + middleSegAngle / 2;
    const rotationInner = 360 * 5 + (randomIndexInner * innerSegAngle) + innerSegAngle / 2;

    setAngleOuter(prev => prev + rotationOuter);
    setAngleMiddle(prev => prev + rotationMiddle);
    setAngleInner(prev => prev + rotationInner);
    setSpinning(true);

    setTimeout(() => {
      setSpinning(false);
      setResult(`${outerSegments[randomIndexOuter]} | ${middleSegments[randomIndexMiddle]} | ${innerSegments[randomIndexInner]}`);
    }, 4000);
  };

  const renderRing = (segments, radius, angle, ringClass) => (
    <g transform={`rotate(${angle}, 100, 100)`} className={`ring ${ringClass}`}>
      <circle cx="100" cy="100" r={radius} fill="none" stroke="#00ffff44" strokeWidth="2" />
      {segments.map((label, i) => {
        const r = (360 / segments.length) * i;
        const x = 100 + radius * Math.cos((r - 90) * Math.PI / 180);
        const y = 100 + radius * Math.sin((r - 90) * Math.PI / 180);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            alignmentBaseline="middle"
            transform={`rotate(${r}, ${x}, ${y})`}
            className={`ring-text ring-${radius}`}
          >
            {label}
          </text>
        );
      })}
    </g>
  );

  return (
    <div className="vortex-container">
      <div className="vortex-title">VORTEX</div>
      <div className="wheel-wrapper">
        <div className="pointer" />
        <div className="wheel">
          <svg className="wheel-svg" viewBox="0 0 200 200">
            {renderRing(outerSegments, 80, angleOuter, 'outer-ring')}
            {renderRing(middleSegments, 60, angleMiddle, 'middle-ring')}
            {renderRing(innerSegments, 40, angleInner, 'inner-ring')}
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
