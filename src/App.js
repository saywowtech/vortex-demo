import { Plus, Minus, RotateCcw } from 'lucide-react'

const App = (props) => {
  const { minimumAmount = 5, currency = '₹' } = props

  const wheelMultipliers = [
    { value: '3.9X', color: 'text-orange-400' },
    { value: '2.5X', color: 'text-green-400' },
    { value: '1.5X', color: 'text-blue-400' },
    { value: '12.5X', color: 'text-purple-400' },
    { value: '200X', color: 'text-red-400' },
    { value: '44X', color: 'text-yellow-400' },
    { value: '1.35X', color: 'text-cyan-400' },
    { value: '27.5X', color: 'text-pink-400' },
    { value: '85X', color: 'text-green-300' },
    { value: '52X', color: 'text-blue-300' },
    { value: '16X', color: 'text-orange-300' },
    { value: '4.35X', color: 'text-purple-300' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-between h-screen px-8">
        {/* Left side - VORTEX logo */}
        <div className="flex-1">
          <div className="relative">
            <h1 className="text-6xl font-bold text-white tracking-wider">
              VORTEX
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-8 bg-gradient-to-r from-purple-600 via-purple-500 to-transparent rounded-full blur-sm opacity-80"></div>
            <div className="absolute -top-2 right-0 w-32 h-8 bg-gradient-to-l from-purple-600 via-purple-500 to-transparent rounded-full blur-sm opacity-60"></div>
          </div>
        </div>

        {/* Center - Wheel */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-96 h-96">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Multiplier labels around outer ring */}
              {wheelMultipliers.map((item, index) => {
                const angle = (index * 30) - 90
                const radius = 170
                const x = Math.cos(angle * Math.PI / 180) * radius
                const y = Math.sin(angle * Math.PI / 180) * radius
                return (
                  <div
                    key={index}
                    className={`absolute text-sm font-bold ${item.color}`}
                    style={{
                      left: `calc(50% + ${x}px - 20px)`,
                      top: `calc(50% + ${y}px - 10px)`,
                      width: '40px',
                      textAlign: 'center'
                    }}
                  >
                    {item.value}
                  </div>
                )
              })}
            </div>

            {/* Middle ring */}
            <div className="absolute inset-8 rounded-full border-4 border-gray-700 bg-gradient-to-br from-gray-700 to-gray-800">
              {/* Colored gems */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full"></div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full"></div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full"></div>
            </div>

            {/* Inner ring */}
            <div className="absolute inset-16 rounded-full border-4 border-gray-600 bg-gradient-to-br from-gray-600 to-gray-700">
              {/* Center circle */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Bonus indicator */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 px-4 py-2 rounded-full text-sm font-bold">
              BONUS
            </div>
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="flex-1 flex justify-end">
          <div className="w-80 space-y-6">
            {/* Minimum amount notification */}
            <div className="bg-gray-700 bg-opacity-50 rounded-lg px-4 py-2 text-sm">
              <span className="text-gray-300">Minimum amount is {currency}{minimumAmount}</span>
            </div>

            {/* Bet Amount */}
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

            {/* Action buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold transition-colors">
                CASH OUT
              </button>
              <button className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors">
                <RotateCcw size={20} />
              </button>
            </div>

            {/* Hold to Spin */}
            <div className="flex justify-center">
              <button className="w-32 h-32 bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 rounded-full flex flex-col items-center justify-center text-white font-bold transition-all transform hover:scale-105">
                <div className="text-xs">HOLD TO</div>
                <div className="text-lg">SPIN</div>
                <div className="w-8 h-8 border-2 border-white rounded-full mt-1 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </button>
            </div>

            {/* Payout info */}
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
  )
}

export default App
