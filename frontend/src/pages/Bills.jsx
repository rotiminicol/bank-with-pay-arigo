import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BillsHistory = () => {
  const [bills] = useState([
    { id: 1, date: '2025-04-15', description: 'Mobile Airtime Top-Up', amount: 20.00, category: 'Airtime', status: 'Paid' },
    { id: 2, date: '2025-04-14', description: 'Electricity Bill', amount: 85.50, category: 'Electricity', status: 'Paid' },
    { id: 3, date: '2025-04-13', description: 'Sports Betting Deposit', amount: 30.00, category: 'Betting', status: 'Pending' },
    { id: 4, date: '2025-04-12', description: 'Internet Subscription', amount: 45.00, category: 'Internet', status: 'Paid' },
    { id: 5, date: '2025-04-11', description: 'Water Bill', amount: 25.75, category: 'Utilities', status: 'Paid' },
    { id: 6, date: '2025-04-10', description: 'Cable TV Subscription', amount: 60.00, category: 'Entertainment', status: 'Pending' },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Bills History
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 font-semibold text-gray-700">
            <div>Date</div>
            <div>Description</div>
            <div>Amount</div>
            <div>Category</div>
            <div>Status</div>
          </div>
          <AnimatePresence>
            {bills.map((bill, index) => (
              <motion.div
                key={bill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50"
              >
                <div className="text-gray-600">{bill.date}</div>
                <div className="text-gray-800">{bill.description}</div>
                <div className="font-medium text-red-600">
                  ${bill.amount.toFixed(2)}
                </div>
                <div className="text-gray-600">{bill.category}</div>
                <div
                  className={`font-medium ${
                    bill.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  {bill.status}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default BillsHistory;