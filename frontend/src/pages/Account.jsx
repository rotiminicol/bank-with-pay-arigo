import  { useState, useEffect } from 'react';
import { ChevronDown, CreditCard, Download, PieChart, Send, Settings, User, DollarSign, Clock, AlertCircle } from 'lucide-react';

const Account = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('transactions');
  const [expandedTransaction, setExpandedTransaction] = useState(null);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const accountData = {
    name: "Sarah Johnson",
    accountNumber: "**** **** **** 4521",
    balance: 5472.85,
    availableBalance: 5247.32,
    transactions: [
      { id: 1, date: "2025-04-15", description: "Grocery Store", amount: -128.45, category: "Shopping", status: "Completed" },
      { id: 2, date: "2025-04-12", description: "Salary Deposit", amount: 3240.00, category: "Income", status: "Completed" },
      { id: 3, date: "2025-04-09", description: "Electric Bill", amount: -98.75, category: "Utilities", status: "Completed" },
      { id: 4, date: "2025-04-05", description: "Restaurant", amount: -65.20, category: "Dining", status: "Completed" },
      { id: 5, date: "2025-04-01", description: "ATM Withdrawal", amount: -200.00, category: "Cash", status: "Completed" },
      { id: 6, date: "2025-03-28", description: "Online Shopping", amount: -89.99, category: "Shopping", status: "Pending" }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const toggleTransaction = (id) => {
    setExpandedTransaction(expandedTransaction === id ? null : id);
  };

  return (
    <div className={`min-h-screen bg-gray-100 p-6 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-100 p-2 rounded-full">
              <Bell className="h-5 w-5 text-blue-600" />
            </button>
            <div className="flex items-center bg-white rounded-full p-1 pr-4 shadow-sm">
              <div className="bg-blue-600 rounded-full p-1 mr-2">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium text-sm">{accountData.name}</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Summary */}
          <div className="col-span-1 lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 transform transition-all duration-500 hover:shadow-md">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Account Summary</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 mb-4 border-l-4 border-blue-600">
                  <p className="text-sm text-gray-600 mb-1">Available Balance</p>
                  <p className="text-2xl font-bold text-gray-800">{formatCurrency(accountData.availableBalance)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Balance</p>
                  <p className="text-xl font-semibold text-gray-800">{formatCurrency(accountData.balance)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Account Number</p>
                  <p className="text-base font-medium text-gray-800">{accountData.accountNumber}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 transform transition-all duration-500 hover:shadow-md">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h2>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: <Send className="h-5 w-5" />, label: "Transfer" },
                  { icon: <CreditCard className="h-5 w-5" />, label: "Pay" },
                  { icon: <Download className="h-5 w-5" />, label: "Deposit" },
                  { icon: <PieChart className="h-5 w-5" />, label: "Insights" },
                  { icon: <Settings className="h-5 w-5" />, label: "Settings" },
                  { icon: <DollarSign className="h-5 w-5" />, label: "Invest" }
                ].map((action, index) => (
                  <button key={index} className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                    <div className="bg-blue-100 p-2 rounded-lg mb-2 text-blue-600">
                      {action.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="col-span-1 lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 transform transition-all duration-500 hover:shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Transaction History</h2>
                <div className="flex space-x-2">
                  <button className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'transactions' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`} 
                    onClick={() => setActiveTab('transactions')}>
                    All
                  </button>
                  <button className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'income' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('income')}>
                    Income
                  </button>
                  <button className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'expenses' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('expenses')}>
                    Expenses
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {accountData.transactions
                  .filter(t => {
                    if (activeTab === 'income') return t.amount > 0;
                    if (activeTab === 'expenses') return t.amount < 0;
                    return true;
                  })
                  .map((transaction) => (
                    <div key={transaction.id} className="animate-fadeIn">
                      <div 
                        className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-300"
                        onClick={() => toggleTransaction(transaction.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                              {transaction.amount > 0 ? 
                                <DollarSign className="h-5 w-5 text-green-600" /> : 
                                <CreditCard className="h-5 w-5 text-red-600" />
                              }
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{transaction.description}</p>
                              <p className="text-xs text-gray-500">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(transaction.amount)}
                            </p>
                            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${expandedTransaction === transaction.id ? 'transform rotate-180' : ''}`} />
                          </div>
                        </div>

                        {/* Expanded Details */}
                        <div className={`mt-3 pt-3 border-t border-gray-200 text-sm grid grid-cols-1 md:grid-cols-3 gap-2 overflow-hidden transition-all duration-500 ${expandedTransaction === transaction.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div>
                            <p className="text-gray-600 flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-400" /> Status
                            </p>
                            <p className="font-medium">{transaction.status}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 flex items-center">
                              <PieChart className="h-4 w-4 mr-2 text-gray-400" /> Category
                            </p>
                            <p className="font-medium">{transaction.category}</p>
                          </div>
                          <div>
                            <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center mt-2">
                              <AlertCircle className="h-4 w-4 mr-1" /> Report issue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              
              <div className="mt-4 text-center">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View all transactions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// This component is only needed for rendering the bell icon
const Bell = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
      />
    </svg>
  );
};

export default Account;