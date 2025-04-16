import { useState } from "react";
import { FaExchangeAlt, FaMoneyBillWave, FaCreditCard,  FaCopy, FaQrcode, FaArrowUp, FaArrowDown, FaSearch } from "react-icons/fa";
import { FiSend, FiUserPlus } from "react-icons/fi";
import { RiExchangeDollarFill } from "react-icons/ri";

const Dashboard = () => {
  
  const [showFullBalance, setShowFullBalance] = useState(false);

  // Sample data
  const exchangeRates = [
    { currency: "USD", rate: "1 USD = 1,200 NGN", trend: "up" },
    { currency: "EUR", rate: "1 EUR = 1,350 NGN", trend: "down" },
    { currency: "GBP", rate: "1 GBP = 1,500 NGN", trend: "up" },
  ];

  const recentTransactions = [
    { type: "credit", name: "Salary Deposit", amount: "₦250,000", date: "Today, 10:45 AM", icon: <FaMoneyBillWave className="text-green-500" /> },
    { type: "debit", name: "Transfer to John", amount: "₦50,000", date: "Yesterday, 2:30 PM", icon: <FiSend className="text-red-500" /> },
    { type: "debit", name: "Electricity Bill", amount: "₦15,000", date: "Mar 15, 9:15 AM", icon: <FaCreditCard className="text-orange-500" /> },
  ];

  const quickActions = [
    { icon: <FiSend size={20} />, label: "Send Money", color: "bg-blue-100 text-blue-600" },
    { icon: <FaQrcode size={20} />, label: "Pay with QR", color: "bg-green-100 text-green-600" },
    { icon: <FiUserPlus size={20} />, label: "Add Beneficiary", color: "bg-purple-100 text-purple-600" },
    { icon: <FaExchangeAlt size={20} />, label: "Currency Swap", color: "bg-yellow-100 text-yellow-600" },
  ];

  return (
    <div className="flex-[4_4_0] mr-auto min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Account Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-gray-500 text-sm">Total Balance</h2>
            <div className="flex items-center mt-2">
              <p className="text-3xl font-bold text-gray-800">
                {showFullBalance ? "₦1,245,876.50" : "₦•••••••"}
              </p>
              <button 
                onClick={() => setShowFullBalance(!showFullBalance)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                {showFullBalance ? "Hide" : "Show"}
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-1">Arigo Pay •••• 4567</p>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <FaCopy className="mr-2" /> Copy Account No.
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center p-4 rounded-xl ${action.color} hover:shadow-md transition`}
            >
              <div className="p-3 rounded-full bg-white mb-2">{action.icon}</div>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Exchange Rates and Recent Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Exchange Rates */}
        <div className="bg-white rounded-xl shadow-sm p-6 col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Exchange Rates</h2>
            <RiExchangeDollarFill className="text-blue-600" size={20} />
          </div>
          <div className="space-y-4">
            {exchangeRates.map((rate, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{rate.currency}</span>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">{rate.rate}</span>
                  {rate.trend === "up" ? (
                    <FaArrowUp className="text-green-500" />
                  ) : (
                    <FaArrowDown className="text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition">
            View All Rates
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm p-6 col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Recent Transactions</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="p-3 rounded-full bg-gray-100 mr-4">
                  {transaction.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{transaction.name}</h3>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <div className={`font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transfer Money Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Transfer Money</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">From</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Arigo Pay Account (₦1,245,876.50)</option>
                <option>Savings Account (₦500,000.00)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">To</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select beneficiary</option>
                <option>John Doe (Zenith Bank •••• 1234)</option>
                <option>Jane Smith (GTBank •••• 5678)</option>
              </select>
            </div>
          </div>
          <div className="col-span-1">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Amount</label>
              <input
                type="text"
                placeholder="0.00"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Narration</label>
              <input
                type="text"
                placeholder="Optional"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="col-span-1 flex flex-col justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Transfer Fee</p>
              <p className="font-medium">₦50.00</p>
            </div>
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              Send Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;