// App.js – Vortex 3-Ring Spinner with Proper Segments and Arrow

import React, { useState } from 'react';
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

    const randOuter = Math.floor(Math.random() * outerSegments.length);
    const randMiddle = Math.floor(Math.random() * middleSegments.length);
    const randInner = Math.floor(Math.random() * innerSegments.length);

    const degOuter = 360 / outerSegments.length;
    const degMiddle = 360 / middleSegments.length;
    const degInner = 360 / innerSegments.length;

    const rotateOuter = 360 * 5 + randOuter * degOuter + degOuter / 2;
    const rotateMiddle = 360 * 5 + randMiddle * degMiddle + degMiddle / 2;
    const rotateInner = 360 * 5 + randInner * degInner + degInner / 2;

    setAngleOuter(prev => prev + rotateOuter);
    setAngleMiddle(prev => prev + rotateMiddle);
    setAngleInner(prev => prev + rotateInner);
    setSpinning(true);

    setTimeout(() => {
      setSpinning(false);
      setResult(`${outerSegments[randOuter]} | ${middleSegments[randMiddle]} | ${innerSegments[randInner]}`);
    }, 4000);
  };

  const drawSegments = (segments, radius, ringClass, angle) => {
    const anglePer = 360 / segments.length;
    return (
      <g
        transform={`rotate(${angle}, 100, 100)`}
        className={`ring ${ringClass}`}
      >
        {segments.map((label, i) => {
          const startAngle = i * anglePer;
          const endAngle = (i + 1) * anglePer;
          const largeArc = anglePer > 180 ? 1 : 0;
          const x1 = 100 + radius * Math.cos((Math.PI / 180) * (startAngle - 90));
          const y1 = 100 + radius * Math.sin((Math.PI / 180) * (startAngle - 90));
          const x2 = 100 + radius * Math.cos((Math.PI / 180) * (endAngle - 90));
          const y2 = 100 + radius * Math.sin((Math.PI / 180) * (endAngle - 90));

          const pathData = `
            M 100 100
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
            Z
          `;

          const midAngle = (startAngle + endAngle) / 2;
          const textX = 100 + (radius - 15) * Math.cos((midAngle - 90) * Math.PI / 180);
          const textY = 100 + (radius - 15) * Math.sin((midAngle - 90) * Math.PI / 180);

          return (
            <g key={i}>
              <path d={pathData} fill={`hsl(${i * 40}, 70%, 45%)`} stroke="#111" strokeWidth="0.5" />
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                alignmentBaseline="middle"
                transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                className="segment-text"
              >
                {label}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <div className="vortex-container">
      <div className="vortex-title">VORTEX</div>
      <div className="wheel-wrapper">
        <div className="pointer" />
        <div className="wheel">
          <svg viewBox="0 0 200 200" className="wheel-svg">
            {drawSegments(outerSegments, 80, 'outer', angleOuter)}
            {drawSegments(middleSegments, 60, 'middle', angleMiddle)}
            {drawSegments(innerSegments, 40, 'inner', angleInner)}
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
