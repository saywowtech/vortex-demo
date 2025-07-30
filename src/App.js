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
            <div className="absolute inset-0 rounded-full border-4 border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 animate-spin-slow">
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
                      top: `calc(50% + ${y}px - 10px)`
                    }}
                  >
                    {item.value}
                  </div>
                )
              })}
            </div>

            <div className="absolute inset-8 rounded-full border-4 border-gray-700 bg-gradient-to-br from-gray-700 to-gray-800"></div>
            <div className="absolute inset-16 rounded-full border-4 border-gray-600 bg-gradient-to-br from-gray-600 to-gray-700">
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
              <button className="w-32 h-32 bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 rounded-full flex flex-col items-center justify-center text-white font-bold transition-all transform hover:scale-105">
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
  )
}

export default App
