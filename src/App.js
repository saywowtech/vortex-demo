import { useState, useRef } from 'react';
import './Wheel.css'; // Load custom ring styles

const App = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const ringRefs = [useRef(), useRef(), useRef()];

  const segments = [
    '3.9X', '2.5X', '1.5X', '12.5X', '200X', '44X',
    '1.35X', '27.5X', '85X', '52X', '16X', '4.35X'
  ];

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    ringRefs.forEach((ref, idx) => {
      const angle = 360 * (5 + idx) + Math.floor(Math.random() * 360);
      if (ref.current) {
        ref.current.style.transition = 'transform 4s ease-out';
        ref.current.style.transform = `rotate(${angle}deg)`;
      }
    });

    setTimeout(() => setIsSpinning(false), 4000);
  };

  const renderSegments = (radius, size = 'text-sm', offset = 0) =>
    segments.map((value, index) => {
      const angle = ((360 / segments.length) * index - 90 + offset) * (Math.PI / 180);
      const x = 160 + radius * Math.cos(angle);
      const y = 160 + radius * Math.sin(angle);
      return (
        <text
          key={`${radius}-${index}`}
          x={x}
          y={y}
          fill="#00ffff"
          fontSize={size}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value}
        </text>
      );
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4 tracking-wider text-cyan-400">VORTEX</h1>
      <div className="wheel-wrapper">
        <div className="pointer"></div>
        <div className="wheel">
          <svg ref={ringRefs[0]} className="ring ring-1" viewBox="0 0 320 320">
            {renderSegments(120, '14')}
          </svg>
          <svg ref={ringRefs[1]} className="ring ring-2" viewBox="0 0 320 320">
            {renderSegments(90, '12', 15)}
          </svg>
          <svg ref={ringRefs[2]} className="ring ring-3" viewBox="0 0 320 320">
            {renderSegments(60, '10', 30)}
          </svg>
          <div className="center-button">V</div>
        </div>
      </div>

      <button
        onClick={spin}
        disabled={isSpinning}
        className="mt-8 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl text-lg font-bold tracking-wider transition"
      >
        {isSpinning ? 'SPINNING...' : 'HOLD TO SPIN'}
      </button>
    </div>
  );
};

export default App;
