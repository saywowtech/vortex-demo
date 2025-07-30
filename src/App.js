import React, { useState, useRef } from 'react';
import './Wheel.css';

const outerRewards = [
  { label: '10X', multiplier: 10, color: '#FF4C60' },
  { label: '8X', multiplier: 8, color: '#FFA94D' },
  { label: '6X', multiplier: 6, color: '#FFD93D' },
  { label: '5X', multiplier: 5, color: '#6BCB77' },
  { label: '4X', multiplier: 4, color: '#4D96FF' },
  { label: '3X', multiplier: 3, color: '#845EC2' },
  { label: '2X', multiplier: 2, color: '#F94C66' },
  { label: '0X', multiplier: 0, color: '#333333' },
];

export default function VortexGame() {
  const [balance, setBalance] = useState(1000);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef(null);
  const spinSoundRef = useRef(null);
  const winSoundRef = useRef(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const anglePerSlice = 360 / outerRewards.length;
    const index = Math.floor(Math.random() * outerRewards.length);
    const extraSpins = 10;
    const finalDeg = 360 * extraSpins + index * anglePerSlice + anglePerSlice / 2 + 90;

    if (spinSoundRef.current) spinSoundRef.current.play();

    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s ease-out';
      wheelRef.current.style.transform = `rotate(-${finalDeg}deg)`;
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
    <div className="vortex-container">
      <audio ref={spinSoundRef} src="https://vortex-demo-files.vercel.app/spin.mp3" />
      <audio ref={winSoundRef} src="https://vortex-demo-files.vercel.app/win.mp3" />

      <h1 className="vortex-title">Vortex Spin Game</h1>

      <div className="wheel-wrapper">
        <div className="pointer"></div>

        <div ref={wheelRef} className="wheel">
          <svg viewBox="0 0 200 200" className="wheel-svg">
            <g transform="translate(100,100)">
              {outerRewards.map((r, i) => {
                const angle = 360 / outerRewards.length;
                const startAngle = angle * i;
                const endAngle = startAngle + angle;
                const largeArc = angle > 180 ? 1 : 0;
                const x1 = 90 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 90 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 90 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 90 * Math.sin((Math.PI * endAngle) / 180);
                const midAngle = startAngle + angle / 2;
                return (
                  <g key={i}>
                    <path
                      d={`M0,0 L${x1},${y1} A90,90 0 ${largeArc} 1 ${x2},${y2} Z`}
                      fill={r.color}
                      stroke="#000"
                      strokeWidth="1"
                    />
                    <text
                      x={(60 * Math.cos((Math.PI * midAngle) / 180)).toFixed(2)}
                      y={(60 * Math.sin((Math.PI * midAngle) / 180)).toFixed(2)}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fontSize="12"
                      fill="#fff"
                    >
                      {r.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
          <div className="center-button">VORTEX</div>
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className="spin-btn"
      >
        {spinning ? 'Spinning...' : 'SPIN NOW'}
      </button>

      <div className="balance">Balance: {balance} coins</div>
      {result && <div className="result">You got: {result}</div>}
    </div>
  );
}
