// Vortex Coin Spin Game with Improved UI
// Clean layout, centered segments, accurate pointer alignment

import React, { useState, useRef } from 'react';
import './Wheel.css';

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

      <div className="relative w-[320px] h-[320px] mb-8">
        <div
          ref={wheelRef}
          id="wheel"
          className="absolute w-full h-full rounded-full border-[10px] border-white overflow-hidden"
        >
          {rewards.map((seg, i) => (
            <div
              key={i}
              className="absolute w-full h-full flex items-center justify-start"
              style={{
                transform: `rotate(${(360 / rewards.length) * i}deg)`
              }}
            >
              <div
                className="h-1/2 w-1/2 flex items-center justify-center text-sm font-bold text-black"
                style={{
                  backgroundColor: seg.color,
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                  transform: `rotate(${360 / rewards.length / 2}deg)` // center the text inside segment
                }}
              >
                {seg.label}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-[-14px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-yellow-300 z-10" />
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
