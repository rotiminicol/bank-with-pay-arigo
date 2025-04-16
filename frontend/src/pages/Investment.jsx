import  { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, Activity, Info, AlertCircle, PlusCircle } from 'lucide-react';

const Investment = () => {
  const [activeTab, setActiveTab] = useState('portfolio');

  const performanceData = [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3800 },
    { month: 'Mar', value: 4200 },
    { month: 'Apr', value: 5000 },
    { month: 'May', value: 4700 },
    { month: 'Jun', value: 5200 },
    { month: 'Jul', value: 5500 },
  ];

  const portfolioData = [
    { name: 'Stocks', value: 45 },
    { name: 'Bonds', value: 25 },
    { name: 'ETFs', value: 20 },
    { name: 'Cash', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const investmentProducts = [
    { id: 1, name: 'Growth Stock Fund', type: 'Stock', risk: 'High', return: '+12.4%', minInvestment: '$500' },
    { id: 2, name: 'Income Bond Fund', type: 'Bond', risk: 'Low', return: '+3.2%', minInvestment: '$1,000' },
    { id: 3, name: 'Technology ETF', type: 'ETF', risk: 'Medium', return: '+15.7%', minInvestment: '$250' },
    { id: 4, name: 'Balanced Portfolio', type: 'Mixed', risk: 'Medium', return: '+8.5%', minInvestment: '$2,000' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-800">Investment Center</h1>
        <p className="text-gray-600 mt-1">Manage your investments and explore new opportunities</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <DollarSign className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Invested</p>
            <p className="text-xl font-bold">$24,500.00</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <TrendingUp className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Returns</p>
            <p className="text-xl font-bold text-green-600">+$2,345.00 (9.6%)</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <Activity className="text-purple-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Investments</p>
            <p className="text-xl font-bold">7</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'portfolio' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('portfolio')}
          >
            My Portfolio
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'market' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('market')}
          >
            Market & Products
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('history')}
          >
            Transaction History
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-6">
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Portfolio Allocation */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Portfolio Allocation</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Performance Chart */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Performance</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#0088FE" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Investment List */}
            <div className="bg-white rounded-lg shadow p-4 lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Your Investments</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tech Growth Fund</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ETF</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$8,240.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+16.4%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">View Details</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Corporate Bond Fund</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bond</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$5,120.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+4.2%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">View Details</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">S&P 500 Index</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Index Fund</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$6,380.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+9.1%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">View Details</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'market' && (
          <div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Explore our investment products and make informed decisions. Need help? <a href="#" className="font-medium underline">Schedule a consultation</a> with our financial advisors.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Investment Products</h2>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Return</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min. Investment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {investmentProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{product.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.risk === 'High' ? 'bg-red-100 text-red-800' : 
                              product.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              {product.risk}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">{product.return}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.minInvestment}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-900">Invest Now</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Remember that all investments carry risk. Past performance is not indicative of future results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Transaction History</h2>
            </div>
            <div className="p-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 12, 2025</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Buy
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Tech Growth Fund</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,500.00</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 28, 2025</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Buy
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Corporate Bond Fund</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$2,000.00</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 15, 2025</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Sell
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Emerging Markets Fund</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$750.00</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors flex items-center">
          <PlusCircle size={24} />
          <span className="ml-2 font-medium">New Investment</span>
        </button>
      </div>
    </div>
  );
};

export default Investment;