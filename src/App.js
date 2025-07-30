// Enhanced Vortex Coin Spin Game: Multi-Ring, Animated Center, Sound Effects

import React, { useState, useRef, useEffect } from 'react';

const outerRewards = [
  { label: '10X', multiplier: 10, color: '#f43f5e' },
  { label: '8X', multiplier: 8, color: '#f97316' },
  { label: '6X', multiplier: 6, color: '#facc15' },
  { label: '5X', multiplier: 5, color: '#34d399' },
  { label: '4X', multiplier: 4, color: '#38bdf8' },
  { label: '3X', multiplier: 3, color: '#8b5cf6' },
  { label: '2X', multiplier: 2, color: '#ec4899' },
  { label: '0X', multiplier: 0, color: '#ef4444' }
];

const innerRewards = [
  { label: '+20', bonus: 20, color: '#6ee7b7' },
  { label: '+10', bonus: 10, color: '#a5f3fc' },
  { label: '+5', bonus: 5, color: '#fcd34d' },
  { label: '+0', bonus: 0, color: '#fca5a5' }
];

export default function VortexGame() {
  const [balance, setBalance] = useState(1000);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);
  const wheelRef = useRef(null);
  const audioRef = useRef(null);
  const spinSoundRef = useRef(null);
  const winSoundRef = useRef(null);

  useEffect(() => {
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
    const outerAngle = 360 / outerRewards.length;
    const outerIndex = Math.floor(Math.random() * outerRewards.length);
    const rotation = 360 * 10 - outerIndex * outerAngle - outerAngle / 2;
    setRotationDeg(rotation);

    if (spinSoundRef.current) spinSoundRef.current.play();

    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s ease-out';
      wheelRef.current.style.transform = `rotate(${rotation}deg)`;
    }

    setTimeout(() => {
      const reward = outerRewards[outerIndex];
      const newBalance = Math.floor(balance * reward.multiplier);
      setBalance(newBalance);
      setResult(reward.label);
      setSpinning(false);
      if (winSoundRef.current) winSoundRef.current.play();
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white relative">
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2023/03/26/audio_1096c2a81a.mp3?filename=8-bit-loop-145850.mp3" />
      <audio ref={spinSoundRef} src="https://cdn.pixabay.com/download/audio/2022/10/26/audio_4aeb8bb8d7.mp3?filename=spin-2-112895.mp3" />
      <audio ref={winSoundRef} src="https://cdn.pixabay.com/download/audio/2023/03/14/audio_3b071a219b.mp3?filename=coin-win-143029.mp3" />

      <h1 className="text-3xl font-bold mb-6">🌀 Vortex Spin</h1>

      <div className="relative w-[340px] h-[340px]">
        <div className="absolute top-[calc(50%-8px)] left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-yellow-300 drop-shadow-lg"></div>
        </div>

        <svg
          ref={wheelRef}
          viewBox="0 0 200 200"
          className="w-full h-full transition-transform duration-1000"
        >
          <g transform="translate(100,100)">
            {outerRewards.map((r, i) => {
              const start = (360 / outerRewards.length) * i;
              const end = start + 360 / outerRewards.length;
              const x1 = 90 * Math.cos((Math.PI * start) / 180);
              const y1 = 90 * Math.sin((Math.PI * start) / 180);
              const x2 = 90 * Math.cos((Math.PI * end) / 180);
              const y2 = 90 * Math.sin((Math.PI * end) / 180);
              const mid = start + 360 / outerRewards.length / 2;
              return (
                <g key={`outer-${i}`}>
                  <path d={`M0,0 L${x1},${y1} A90,90 0 0 1 ${x2},${y2} Z`} fill={r.color} stroke="black" strokeWidth="0.5" />
                  <text
                    x={(70 * Math.cos((Math.PI * mid) / 180)).toFixed(2)}
                    y={(70 * Math.sin((Math.PI * mid) / 180)).toFixed(2)}
                    fontSize="8"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill="black"
                  >
                    {r.label}
                  </text>
                </g>
              );
            })}
            {innerRewards.map((r, i) => {
              const start = (360 / innerRewards.length) * i;
              const end = start + 360 / innerRewards.length;
              const x1 = 60 * Math.cos((Math.PI * start) / 180);
              const y1 = 60 * Math.sin((Math.PI * start) / 180);
              const x2 = 60 * Math.cos((Math.PI * end) / 180);
              const y2 = 60 * Math.sin((Math.PI * end) / 180);
              const mid = start + 360 / innerRewards.length / 2;
              return (
                <g key={`inner-${i}`}>
                  <path d={`M0,0 L${x1},${y1} A60,60 0 0 1 ${x2},${y2} Z`} fill={r.color} stroke="black" strokeWidth="0.5" />
                  <text
                    x={(45 * Math.cos((Math.PI * mid) / 180)).toFixed(2)}
                    y={(45 * Math.sin((Math.PI * mid) / 180)).toFixed(2)}
                    fontSize="7"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill="black"
                  >
                    {r.label}
                  </text>
                </g>
              );
            })}

            <circle r="20" fill="white" className="animate-pulse">
              <animate attributeName="fill" values="white;#38bdf8;white" dur="1s" repeatCount="indefinite" />
            </circle>
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
