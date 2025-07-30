import React, { useState, useRef, useEffect } from 'react'; // Import useEffect
import './Wheel.css';

const outerRewards = [
  { label: '10X', multiplier: 10, color: '#FF4C60' }, // Red
  { label: '8X', multiplier: 8, color: '#FFA94D' }, // Orange
  { label: '6X', multiplier: 6, color: '#FFD93D' }, // Yellow
  { label: '5X', multiplier: 5, color: '#6BCB77' }, // Green
  { label: '4X', multiplier: 4, color: '#4D96FF' }, // Blue
  { label: '3X', multiplier: 3, color: '#845EC2' }, // Purple
  { label: '2X', multiplier: 2, color: '#F94C66' }, // Pink
  { label: '0X', multiplier: 0, color: '#333333' }, // Dark Grey/Black for 0X
];

export default function VortexGame() {
  const [balance, setBalance] = useState(1000);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef(null);
  const spinSoundRef = useRef(null);
  const winSoundRef = useRef(null);
  const bgMusicRef = useRef(null); // Ref for background music

  // Play background music on component mount
  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.play().catch(e => console.error("Background music auto-play failed:", e));
    }
  }, []); // Empty dependency array means this runs once on mount

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null); // Clear previous result
    
    // Stop and reset spin sound if it was previously playing
    if (spinSoundRef.current) {
        spinSoundRef.current.pause();
        spinSoundRef.current.currentTime = 0;
        spinSoundRef.current.play();
    }

    const anglePerSlice = 360 / outerRewards.length;
    const index = Math.floor(Math.random() * outerRewards.length);
    const extraSpins = 10;
    // Calculate final angle to land precisely in the middle of the segment
    const finalDeg = 360 * extraSpins + (360 - (index * anglePerSlice + anglePerSlice / 2)); 
    // We subtract from 360 because the SVG starts at 0 degrees on the right, and we want to land pointer up.
    // The previous formula might have caused slight misalignment due to SVG's initial orientation.

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
      if (winSoundRef.current) {
        winSoundRef.current.pause(); // Stop if still playing
        winSoundRef.current.currentTime = 0; // Reset
        winSoundRef.current.play();
      }
      
      // Reset transform after spin to prepare for next spin cleanly without accumulating rotation
      if (wheelRef.current) {
        wheelRef.current.style.transition = 'none'; // Remove transition
        // Calculate the actual current rotation after the spin
        const currentRotation = finalDeg % 360; 
        wheelRef.current.style.transform = `rotate(${currentRotation}deg)`;
      }

    }, 4000);
  };

  return (
    <div className="vortex-container">
      <audio ref={spinSoundRef} src="https://vortex-demo-files.vercel.app/spin.mp3" preload="auto" /> {/* Preload for faster playback */}
      <audio ref={winSoundRef} src="https://vortex-demo-files.vercel.app/win.mp3" preload="auto" />
      <audio ref={bgMusicRef} autoPlay loop src="https://vortex-demo-files.vercel.app/bg-music.mp3" /> {/* Add ref here */}

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
                // Points for the arc (90 radius)
                const x1 = 90 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 90 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 90 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 90 * Math.sin((Math.PI * endAngle) / 180);
                
                // For text positioning, use a slightly smaller radius (e.g., 60 or 70)
                const textRadius = 65; // Adjusted for better placement
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
                      x={(textRadius * Math.cos((Math.PI * midAngle) / 180)).toFixed(2)}
                      y={(textRadius * Math.sin((Math.PI * midAngle) / 180)).toFixed(2)}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fontSize="14" // Slightly larger font for rewards
                      fill="#fff"
                      transform={`rotate(${midAngle + 90}, ${(textRadius * Math.cos((Math.PI * midAngle) / 180)).toFixed(2)}, ${(textRadius * Math.sin((Math.PI * midAngle) / 180)).toFixed(2)})`}
                      // Rotate text to align with segments, +90 for upright text in SVG context
                    >
                      {r.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
          <div className="center-button"></div>
        </div>
      </div>

      <button onClick={spinWheel} disabled={spinning} className="spin-btn">
        {spinning ? 'Spinning...' : 'SPIN NOW'}
      </button>

      <div className="balance">Balance: {balance} coins</div>
      {result && <div className="result">You got: {result}</div>}
    </div>
  );
}
