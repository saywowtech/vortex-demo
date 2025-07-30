import { useState, useRef } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

const App = ({ minimumAmount = 5, currency = '₹' }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const outerRef = useRef();
  const middleRef = useRef();
  const innerRef = useRef();

  const multipliers = [
    '3.9X', '2.5X', '1.5X', '12.5X', '200X', '44X',
    '1.35X', '27.5X', '85X', '52X', '16X', '4.35X'
  ];

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const randomDeg = () => 360 * 5 + Math.floor(Math.random() * 360);

    outerRef.current.style.transition = 'transform 4s ease-out';
    outerRef.current.style.transform = `rotate(${randomDeg()}deg)`;

    middleRef.current.style.transition = 'transform 4s ease-out';
    middleRef.current.style.transform = `rotate(${randomDeg()}deg)`;

    innerRef.current.style.transition = 'transform 4s ease-out';
    innerRef.current.style.transform = `rotate(${randomDeg()}deg)`;

    setTimeout(() => setIsSpinning(false), 4000);
  };

  const renderLabels = (radius, size = 'text-sm') =>
    multipliers.map((value, index) => {
      const angle = (index * 30 - 90) * (Math.PI / 180);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return (
        <div
          key={`${radius}-${index}`}
          className={`absolute ${size} font-bold text-white`}
          style={{
            left: `calc(50% + ${x}px - 18px)`,
            top: `calc(50% + ${y}px - 12px)`,
            width: '36px',
            textAlign: 'center',
          }}
        >
          {value}
        </div>
      );
    });

  const renderSegments = (count, radius) => {
    const lines = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * 360) / count;
      const rotate = `rotate(${angle}deg)`;
      lines.push(
        <div
          key={i}
          className="absolute left-1/2 top-1/2 w-px h-[48%] bg-gray-700"
          style={{
            transform: `${rotate} translateY(-50%)`,
            transformOrigin: 'bottom center',
          }}
        />
      );
    }
    return lines;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-16 left-16 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 right-16 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-screen px-8">
        <div className="lg:flex-1 text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-6xl font-extrabold tracking-widest text-white mb-4">VORTEX</h1>
          <p className="text-lg text-gray-400">Spin and Win Big Rewards!</p>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-96 h-96">
            {/* Outer ring */}
            <div
              ref={outerRef}
              className="absolute inset-0 rounded-full border-4 border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900"
            >
              {renderLabels(150)}
              {renderSegments(12, 150)}
            </div>

            {/* Middle ring */}
            <div
              ref={middleRef}
              className="absolute inset-8 rounded-full border-4 border-gray-700 bg-gradient-to-br from-gray-700 to-gray-800"
            >
              {renderLabels(110, 'text-xs')}
              {renderSegments(12, 110)}
            </div>

            {/* Inner ring */}
            <div
              ref={innerRef}
              className="absolute inset-16 rounded-full border-4 border-gray-600 bg-gradient-to-br from-gray-600 to-gray-700"
            >
              {renderLabels(70, 'text-[10px]')}
              {renderSegments(12, 70)}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 px-4 py-1 rounded-full text-sm font-semibold shadow-md">
              BONUS
            </div>
          </div>
        </div>

        <div className="lg:flex-1 w-full lg:w-auto mt-12 lg:mt-0">
          <div className="max-w-sm mx-auto space-y-6">
            <div className="bg-gray-700 bg-opacity-50 rounded-lg px-4 py-2 text-sm text-gray-300">
              Minimum amount is {currency}{minimumAmount}
            </div>

            <div className="text-center">
              <div className="text-gray-400 text-sm mb-2">Bet Amount</div>
              <div className="flex items-center justify-center space-x-4">
                <button className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                  <Minus size={20} />
                </button>
                <div className="text-2xl font-bold">{currency}0</div>
                <button className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold transition-colors">
                CASH OUT
              </button>
              <button className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors">
                <RotateCcw size={20} />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={spin}
                disabled={isSpinning}
                className="w-32 h-32 bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 rounded-full flex flex-col items-center justify-center text-white font-bold transition-all transform hover:scale-105"
              >
                <div className="text-xs">HOLD TO</div>
                <div className="text-lg">SPIN</div>
                <div className="w-8 h-8 border-2 border-white rounded-full mt-1 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </button>
            </div>

            <div className="flex justify-between text-sm">
              <div>
                <div className="text-gray-400">Payout</div>
                <div className="font-bold">0.00{currency}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-400">Part PayOut</div>
                <div className="font-bold">-</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
