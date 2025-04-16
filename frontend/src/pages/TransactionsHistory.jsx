import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionsHistory = () => {
  const [transactions] = useState([
    { id: 1, date: '2025-04-15', description: 'Grocery Store', amount: -45.99, category: 'Shopping' },
    { id: 2, date: '2025-04-14', description: 'Salary Deposit', amount: 2500.00, category: 'Income' },
    { id: 3, date: '2025-04-13', description: 'Electric Bill', amount: -120.50, category: 'Utilities' },
    { id: 4, date: '2025-04-12', description: 'Coffee Shop', amount: -7.25, category: 'Dining' },
    { id: 5, date: '2025-04-11', description: 'Freelance Payment', amount: 800.00, category: 'Income' },
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
          Transactions History
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 font-semibold text-gray-700">
            <div>Date</div>
            <div>Description</div>
            <div>Amount</div>
            <div>Category</div>
          </div>
          <AnimatePresence>
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50"
              >
                <div className="text-gray-600">{transaction.date}</div>
                <div className="text-gray-800">{transaction.description}</div>
                <div
                  className={`font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </div>
                <div className="text-gray-600">{transaction.category}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionsHistory;