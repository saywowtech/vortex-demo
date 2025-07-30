// Enhanced 3D Vortex Coin Spin Game: Realistic UI Upgrade

import React, { useState, useRef, useEffect } from 'react';

const outerRewards = [
  { label: '10X', multiplier: 10, color: '#e11d48' },
  { label: '8X', multiplier: 8, color: '#f97316' },
  { label: '6X', multiplier: 6, color: '#facc15' },
  { label: '5X', multiplier: 5, color: '#10b981' },
  { label: '4X', multiplier: 4, color: '#0ea5e9' },
  { label: '3X', multiplier: 3, color: '#6366f1' },
  { label: '2X', multiplier: 2, color: '#db2777' },
  { label: '0X', multiplier: 0, color: '#ef4444' }
];

export default function VortexGame() {
  const [balance, setBalance] = useState(1000);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);
  const wheelRef = useRef(null);
  const spinSoundRef = useRef(null);
  const winSoundRef = useRef(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const anglePerSlice = 360 / outerRewards.length;
    const index = Math.floor(Math.random() * outerRewards.length);
    const extraSpins = 10;
    const finalDeg = 360 * extraSpins - index * anglePerSlice - anglePerSlice / 2;
    setRotationDeg(finalDeg);

    if (spinSoundRef.current) spinSoundRef.current.play();

    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s ease-out';
      wheelRef.current.style.transform = `rotate(${finalDeg}deg)`;
    }

    setTimeout(() => {
      const reward = outerRewards[index];
      const newBalance = Math.floor(balance * reward.multiplier);
      setBalance(newBalance);
      setResult(reward.label);
      setSpinning(false);
      if (winSoundRef.current) winSoundRef.current.play();
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-black text-white relative">
      <audio ref={spinSoundRef} src="https://cdn.pixabay.com/download/audio/2022/10/26/audio_4aeb8bb8d7.mp3?filename=spin-2-112895.mp3" />
      <audio ref={winSoundRef} src="https://cdn.pixabay.com/download/audio/2023/03/14/audio_3b071a219b.mp3?filename=coin-win-143029.mp3" />

      <h1 className="text-3xl font-bold mb-6 tracking-widest">🎰 Vortex Spin</h1>

      <div className="relative w-[360px] h-[360px] rounded-full shadow-[inset_0_0_50px_rgba(255,255,255,0.2)] bg-gradient-to-br from-gray-700 to-gray-900 p-4">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[170px] z-30">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-yellow-300 drop-shadow-xl"></div>
        </div>

        <div
          ref={wheelRef}
          className="w-full h-full rounded-full transition-transform duration-1000 bg-[conic-gradient(var(--tw-gradient-stops))] [--tw-gradient-from:#f43f5e] [--tw-gradient-to:#6366f1] shadow-2xl flex items-center justify-center relative"
          style={{ transform: `rotate(${rotationDeg}deg)` }}
        >
          <svg viewBox="0 0 200 200" className="absolute w-full h-full">
            <g transform="translate(100,100)">
              {outerRewards.map((r, i) => {
                const startAngle = (360 / outerRewards.length) * i;
                const endAngle = startAngle + 360 / outerRewards.length;
                const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                const x1 = 90 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 90 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 90 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 90 * Math.sin((Math.PI * endAngle) / 180);
                const midAngle = startAngle + (360 / outerRewards.length) / 2;
                return (
                  <g key={i}>
                    <path
                      d={`M0,0 L${x1},${y1} A90,90 0 ${largeArc} 1 ${x2},${y2} Z`}
                      fill={r.color}
                      stroke="white"
                      strokeWidth="1"
                    />
                    <text
                      x={(60 * Math.cos(Math.PI * midAngle / 180)).toFixed(2)}
                      y={(60 * Math.sin(Math.PI * midAngle / 180)).toFixed(2)}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fontSize="10"
                      fill="white"
                      fontWeight="bold"
                    >
                      {r.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
          <div className="absolute w-[80px] h-[80px] rounded-full bg-gradient-to-br from-white/80 to-gray-200 shadow-inner flex items-center justify-center animate-pulse">
            <div className="w-[40px] h-[40px] rounded-full bg-yellow-400 shadow-lg border-2 border-white"></div>
          </div>
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded-full shadow-md disabled:opacity-60"
      >
        {spinning ? 'Spinning...' : 'SPIN NOW'}
      </button>

      <div className="mt-4 text-xl">Balance: <strong>{balance}</strong> coins</div>
      {result && <div className="mt-2 text-lg">You got: <strong>{result}</strong></div>}
    </div>
  );
}
