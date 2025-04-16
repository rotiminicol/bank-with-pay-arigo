import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loan = () => {
  const [loans] = useState([
    {
      id: 1,
      type: 'Personal Loan',
      amount: 10000,
      interestRate: 5.5,
      term: '5 years',
      monthlyPayment: 191.01,
      status: 'Active',
    },
    {
      id: 2,
      type: 'Home Loan',
      amount: 200000,
      interestRate: 3.8,
      term: '30 years',
      monthlyPayment: 932.57,
      status: 'Active',
    },
    {
      id: 3,
      type: 'Car Loan',
      amount: 25000,
      interestRate: 4.9,
      term: '7 years',
      monthlyPayment: 373.28,
      status: 'Pending',
    },
  ]);

  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleApplyLoan = () => {
    // Simulate loan application process
    alert('Redirecting to loan application form...');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Loan Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Loan List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-2 bg-white shadow-md rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Loans
            </h2>
            <div className="space-y-4">
              <AnimatePresence>
                {loans.map((loan, index) => (
                  <motion.div
                    key={loan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => setSelectedLoan(loan)}
                    className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer rounded-md"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-medium text-gray-800">
                          {loan.type}
                        </p>
                        <p className="text-sm text-gray-600">
                          Amount: ${loan.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Monthly: ${loan.monthlyPayment.toFixed(2)}
                        </p>
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          loan.status === 'Active'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {loan.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Loan Details / Apply */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            {selectedLoan ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Loan Details
                </h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <p className="text-gray-600">
                    <span className="font-medium">Type:</span> {selectedLoan.type}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Amount:</span> $
                    {selectedLoan.amount.toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Interest Rate:</span>{' '}
                    {selectedLoan.interestRate}%
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Term:</span> {selectedLoan.term}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Monthly Payment:</span> $
                    {selectedLoan.monthlyPayment.toFixed(2)}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Status:</span>{' '}
                    {selectedLoan.status}
                  </p>
                  <button
                    onClick={() => setSelectedLoan(null)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Back to Loans
                  </button>
                </motion.div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Apply for a New Loan
                </h2>
                <p className="text-gray-600 mb-4">
                  Start your journey with a new loan tailored to your needs.
                </p>
                <button
                  onClick={handleApplyLoan}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Apply Now
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Loan;