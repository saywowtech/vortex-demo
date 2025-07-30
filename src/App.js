// Vortex Coin Spin Game with SVG-based Neon UI and Background Music

import React, { useState, useRef, useEffect } from 'react';

const rewards = [
  { label: '4X', multiplier: 4, color: '#3b82f6' },
  { label: '2X', multiplier: 2, color: '#10b981' },
  { label: '0.5X', multiplier: 0.5, color: '#facc15' },
  { label: '1.5X', multiplier: 1.5, color: '#f87171' },
  { label: '3X', multiplier: 3, color: '#8b5cf6' },
  { label: '10X', multiplier: 10, color: '#f472b6' },
  { label: '5X', multiplier: 5, color: '#34d399' },
  { label: '0X', multiplier: 0, color: '#ef4444' }
];

export default function VortexGame() {
  const [balance, setBalance] = useState(1000);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Autoplay background music once interaction happens
    const playMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        document.removeEventListener('click', playMusic);
      }
    };
    document.addEventListener('click', playMusic);
    return () => document.removeEventListener('click', playMusic);
  }, []);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const index = Math.floor(Math.random() * rewards.length);
    const anglePerSlice = 360 / rewards.length;
    const rotation = 3600 - (index * anglePerSlice + anglePerSlice / 2); // Pointer fixed at top (0deg)
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s ease-out';
      wheelRef.current.style.transform = `rotate(${rotation}deg)`;
    }
    setTimeout(() => {
      const reward = rewards[index];
      const newBalance = Math.floor(balance * reward.multiplier);
      setBalance(newBalance);
      setResult(reward.label);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2023/03/26/audio_1096c2a81a.mp3?filename=8-bit-loop-145850.mp3" />

      <h1 className="text-3xl font-bold mb-6">🎯 Vortex Coin Spin</h1>

      <div className="relative w-[340px] h-[340px]">
        <div className="absolute top-[calc(50%-8px)] left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-yellow-300 drop-shadow-lg"></div>
        </div>

        <svg
          ref={wheelRef}
          viewBox="0 0 200 200"
          className="w-full h-full transition-transform duration-1000 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
        >
          <g transform="translate(100,100)">
            {rewards.map((r, i) => {
              const startAngle = (360 / rewards.length) * i;
              const endAngle = startAngle + 360 / rewards.length;
              const largeArc = endAngle - startAngle > 180 ? 1 : 0;
              const x1 = 90 * Math.cos((Math.PI * startAngle) / 180);
              const y1 = 90 * Math.sin((Math.PI * startAngle) / 180);
              const x2 = 90 * Math.cos((Math.PI * endAngle) / 180);
              const y2 = 90 * Math.sin((Math.PI * endAngle) / 180);
              const textAngle = startAngle + (360 / rewards.length) / 2;
              return (
                <g key={i}>
                  <path
                    d={`M0,0 L${x1},${y1} A90,90 0 ${largeArc} 1 ${x2},${y2} Z`}
                    fill={r.color}
                    stroke="black"
                    strokeWidth="0.5"
                  />
                  <text
                    x={(60 * Math.cos(Math.PI * textAngle / 180)).toFixed(2)}
                    y={(60 * Math.sin(Math.PI * textAngle / 180)).toFixed(2)}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="8"
                    fill="black"
                  >
                    {r.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <button
        className="mt-8 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-full shadow-xl disabled:opacity-50"
        onClick={spinWheel} disabled={spinning}
      >
        {spinning ? 'Spinning...' : 'SPIN'}
      </button>

      <div className="mt-4 text-xl">Balance: <strong>{balance}</strong> coins</div>
      {result && <div className="mt-2 text-lg">You got: <strong>{result}</strong></div>}
    </div>
  );
}
