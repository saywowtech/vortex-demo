
// Vortex Coin Spin Game with Spinning Wheel (Demo Version)
// Built in ReactJS with Tailwind CSS styling and CSS rotation animation

import React, { useState, useRef } from 'react';
import './Wheel.css'; // We'll define animation styles in this CSS

const rewards = [
  { label: '+50', value: 50, color: '#22c55e' },
  { label: '+100', value: 100, color: '#16a34a' },
  { label: '-30', value: -30, color: '#ef4444' },
  { label: '+200', value: 200, color: '#fbbf24' },
  { label: 'x2', multiplier: 2, color: '#3b82f6' },
  { label: '-100', value: -100, color: '#dc2626' },
  { label: '+10', value: 10, color: '#84cc16' },
  { label: 'x0.5', multiplier: 0.5, color: '#f59e0b' }
];

export default function VortexGame() {
  const [balance, setBalance] = useState(1000);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const index = Math.floor(Math.random() * rewards.length);
    const degrees = 3600 + index * (360 / rewards.length);
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s ease-out';
      wheelRef.current.style.transform = `rotate(${degrees}deg)`;
    }

    setTimeout(() => {
      const reward = rewards[index];
      let newBalance = balance;
      if (reward.value !== undefined) {
        newBalance += reward.value;
      } else if (reward.multiplier) {
        newBalance = Math.floor(balance * reward.multiplier);
      }
      setBalance(newBalance);
      setResult(reward.label);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 to-indigo-700 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">🎡 Vortex Spin Game</h1>

      <div className="relative w-[300px] h-[300px] mb-8">
        <div
          ref={wheelRef}
          id="wheel"
          className="absolute w-full h-full rounded-full border-[8px] border-white flex items-center justify-center"
        >
          {rewards.map((seg, i) => (
            <div
              key={i}
              className="absolute w-1/2 h-1/2 origin-bottom left-1/2 top-0 text-xs text-black font-bold text-center"
              style={{
                transform: `rotate(${(360 / rewards.length) * i}deg)`,
                backgroundColor: seg.color,
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)'
              }}
            >
              <div className="mt-2 rotate-[-90deg]">{seg.label}</div>
            </div>
          ))}
        </div>
        <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-yellow-300" />
      </div>

      <button
        className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full hover:bg-yellow-300 disabled:opacity-50"
        onClick={spinWheel} disabled={spinning}
      >
        {spinning ? 'Spinning...' : 'Spin Now'}
      </button>

      <div className="mt-4 text-xl">Balance: <strong>{balance}</strong> coins</div>
      {result && <div className="mt-2 text-lg">You got: <strong>{result}</strong></div>}
    </div>
  );
}
