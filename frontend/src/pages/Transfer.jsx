import  { useState, useEffect } from 'react';

const Transfer = () => {
  const [formData, setFormData] = useState({
    senderAccount: '',
    receiverBank: '',
    receiverAccountNumber: '',
    receiverName: '',
    amount: '',
    narration: '',
    pin: ''
  });
  
  const [isValidatingAccount, setIsValidatingAccount] = useState(false);
  const [transferFee, setTransferFee] = useState(0);
  const [showPinModal, setShowPinModal] = useState(false);
  const [transferStatus, setTransferStatus] = useState(null); // null, 'processing', 'success', 'failed'
  const [recentTransfers, setRecentTransfers] = useState([]);
  const [banksList, setBanksList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});

  // Mock Nigerian banks data
  useEffect(() => {
    // In a real app, you would fetch this from an API
    setBanksList([
      { id: '001', name: 'Access Bank', code: '044' },
      { id: '002', name: 'Zenith Bank', code: '057' },
      { id: '003', name: 'First Bank of Nigeria', code: '011' },
      { id: '004', name: 'Guaranty Trust Bank', code: '058' },
      { id: '005', name: 'United Bank for Africa', code: '033' },
      { id: '006', name: 'Fidelity Bank', code: '070' },
      { id: '007', name: 'Ecobank Nigeria', code: '050' },
      { id: '008', name: 'Union Bank', code: '032' },
      { id: '009', name: 'Wema Bank', code: '035' },
      { id: '010', name: 'Sterling Bank', code: '232' },
      { id: '011', name: 'Polaris Bank', code: '076' },
      { id: '012', name: 'Stanbic IBTC Bank', code: '221' },
      { id: '013', name: 'Standard Chartered Bank', code: '068' },
      { id: '014', name: 'Heritage Bank', code: '030' },
      { id: '015', name: 'Keystone Bank', code: '082' },
      { id: '016', name: 'Citibank Nigeria', code: '023' },
      { id: '017', name: 'Unity Bank', code: '215' },
      { id: '018', name: 'Jaiz Bank', code: '301' },
      { id: '019', name: 'Titan Trust Bank', code: '102' },
      { id: '020', name: 'Providus Bank', code: '101' },
      { id: '021', name: 'Globus Bank', code: '103' },
      { id: '022', name: 'SunTrust Bank', code: '100' },
      { id: '023', name: 'Taj Bank', code: '302' },
      { id: '024', name: 'Kuda Bank', code: '090267' },
      { id: '025', name: 'VFD Microfinance Bank', code: '090110' },
      { id: '026', name: 'Palmpay', code: '100033' },
      { id: '027', name: 'Opay Digital Services', code: '100004' },
      { id: '028', name: 'Moniepoint MFB', code: '100022' },
      { id: '029', name: 'Rubies Microfinance Bank', code: '090175' }
    ]);

    // Mock recent transfers
    setRecentTransfers([
      { 
        id: '1', 
        receiverName: 'John Okafor', 
        bank: 'Access Bank', 
        accountNumber: '0123456789', 
        amount: 25000, 
        date: '2025-04-12T10:30:00' 
      },
      { 
        id: '2', 
        receiverName: 'Amina Ibrahim', 
        bank: 'Zenith Bank', 
        accountNumber: '9876543210', 
        amount: 50000, 
        date: '2025-04-10T14:45:00' 
      },
      { 
        id: '3', 
        receiverName: 'Chijioke Eze', 
        bank: 'GTBank', 
        accountNumber: '5678901234', 
        amount: 10000, 
        date: '2025-04-08T09:15:00' 
      }
    ]);
  }, []);

  const filteredBanks = banksList.filter(bank => 
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateAccountNumber = async () => {
    if (formData.receiverBank && formData.receiverAccountNumber.length === 10) {
      setIsValidatingAccount(true);
      
      // Mock API call - in real app, call your bank verification API
      setTimeout(() => {
        setFormData({
          ...formData,
          receiverName: "Verified User Name"
        });
        setIsValidatingAccount(false);
      }, 1500);
    }
  };

  const calculateFee = () => {
    const amount = parseFloat(formData.amount) || 0;
    // Mock fee calculation - adjust based on your business rules
    if (amount <= 5000) {
      setTransferFee(10);
    } else if (amount <= 50000) {
      setTransferFee(25);
    } else {
      setTransferFee(50);
    }
  };

  useEffect(() => {
    validateAccountNumber();
  }, [formData.receiverBank, formData.receiverAccountNumber]);

  useEffect(() => {
    calculateFee();
  }, [formData.amount]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.senderAccount) newErrors.senderAccount = 'Please select sender account';
    if (!formData.receiverBank) newErrors.receiverBank = 'Please select a bank';
    if (!formData.receiverAccountNumber) {
      newErrors.receiverAccountNumber = 'Please enter account number';
    } else if (formData.receiverAccountNumber.length !== 10) {
      newErrors.receiverAccountNumber = 'Account number must be 10 digits';
    }
    if (!formData.amount) {
      newErrors.amount = 'Please enter amount';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setShowPinModal(true);
    }
  };

  const handlePinSubmit = () => {
    if (formData.pin.length !== 4) {
      setErrors({...errors, pin: 'PIN must be 4 digits'});
      return;
    }
    
    setShowPinModal(false);
    setTransferStatus('processing');
    
    // Mock processing time
    setTimeout(() => {
      // 90% chance of success
      if (Math.random() < 0.9) {
        setTransferStatus('success');
        // Add to recent transfers
        setRecentTransfers([
          {
            id: Date.now().toString(),
            receiverName: formData.receiverName,
            bank: banksList.find(bank => bank.id === formData.receiverBank)?.name || 'Unknown Bank',
            accountNumber: formData.receiverAccountNumber,
            amount: parseFloat(formData.amount),
            date: new Date().toISOString()
          },
          ...recentTransfers
        ]);
      } else {
        setTransferStatus('failed');
      }
      
      // Reset after 5 seconds
      setTimeout(() => {
        setTransferStatus(null);
        // Reset form if transfer was successful
        if (transferStatus === 'success') {
          setFormData({
            senderAccount: '',
            receiverBank: '',
            receiverAccountNumber: '',
            receiverName: '',
            amount: '',
            narration: '',
            pin: ''
          });
        }
      }, 5000);
    }, 3000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-green-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Arigo Pay - Transfer</h1>
          <p className="mt-1">Send money to any bank account in Nigeria</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Transfer Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Bank Transfer</h2>

              {transferStatus === 'processing' && (
                <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-3"></div>
                  <p className="text-blue-600">Processing your transfer...</p>
                </div>
              )}

              {transferStatus === 'success' && (
                <div className="bg-green-50 p-4 rounded-md mb-6">
                  <div className="flex items-center">
                    <div className="bg-green-500 text-white rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-green-600 font-medium">Transfer successful!</p>
                  </div>
                  <p className="mt-2 text-green-600">
                    You have successfully transferred {formatCurrency(parseFloat(formData.amount))} to {formData.receiverName}
                  </p>
                </div>
              )}

              {transferStatus === 'failed' && (
                <div className="bg-red-50 p-4 rounded-md mb-6">
                  <div className="flex items-center">
                    <div className="bg-red-500 text-white rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-red-600 font-medium">Transfer failed!</p>
                  </div>
                  <p className="mt-2 text-red-600">
                    Something went wrong with your transfer. Please try again.
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {/* From Account */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">From Account</label>
                  <select
                    name="senderAccount"
                    value={formData.senderAccount}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.senderAccount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    <option value="">Select Account</option>
                    <option value="savings">Savings Account - 1234567890 (₦1,250,000.00)</option>
                    <option value="current">Current Account - 0987654321 (₦350,000.00)</option>
                  </select>
                  {errors.senderAccount && <p className="text-red-500 text-xs mt-1">{errors.senderAccount}</p>}
                </div>

                {/* Bank Selection */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Select Bank</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search banks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
                    />
                    <div className={`max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md ${searchTerm && filteredBanks.length > 0 ? 'block' : 'hidden'}`}>
                      {filteredBanks.map(bank => (
                        <div
                          key={bank.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData({...formData, receiverBank: bank.id});
                            setSearchTerm(bank.name);
                          }}
                        >
                          {bank.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  {errors.receiverBank && <p className="text-red-500 text-xs mt-1">{errors.receiverBank}</p>}
                </div>

                {/* Account Number */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Account Number</label>
                  <input
                    type="text"
                    name="receiverAccountNumber"
                    placeholder="10-digit account number"
                    value={formData.receiverAccountNumber}
                    onChange={handleChange}
                    maxLength={10}
                    className={`w-full p-3 border ${errors.receiverAccountNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                  {errors.receiverAccountNumber && <p className="text-red-500 text-xs mt-1">{errors.receiverAccountNumber}</p>}
                </div>

                {/* Account Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Account Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="receiverName"
                      placeholder="Account name will appear here"
                      value={formData.receiverName}
                      readOnly
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                    />
                    {isValidatingAccount && (
                      <div className="absolute right-3 top-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-500"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Amount (NGN)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-600">₦</span>
                    <input
                      type="text"
                      name="amount"
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className={`w-full p-3 pl-8 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                  </div>
                  {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                  {formData.amount && !errors.amount && (
                    <p className="text-sm text-gray-600 mt-1">Transfer fee: {formatCurrency(transferFee)}</p>
                  )}
                </div>

                {/* Narration/Description */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Narration (Optional)</label>
                  <textarea
                    name="narration"
                    placeholder="What's this transfer for?"
                    value={formData.narration}
                    onChange={handleChange}
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md transition duration-300"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>

          {/* Recent Transfers */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Transfers</h2>
              {recentTransfers.length > 0 ? (
                <div className="space-y-4">
                  {recentTransfers.map((transfer) => (
                    <div key={transfer.id} className="border-b border-gray-100 pb-3 last:border-0">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{transfer.receiverName}</p>
                          <p className="text-sm text-gray-500">{transfer.bank} - {transfer.accountNumber}</p>
                          <p className="text-xs text-gray-400">{formatDate(transfer.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{formatCurrency(transfer.amount)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No recent transfers</p>
                </div>
              )}
            </div>

            {/* Transfer Tips */}
            <div className="bg-blue-50 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-medium text-blue-800 mb-3">Transfer Tips</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Always verify account details before sending money
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Keep your transfer PIN private and secure
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Transfers between Arigo Pay accounts are instant
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Report suspicious activities to our customer care
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Enter Transaction PIN</h3>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Confirm transfer of {formatCurrency(parseFloat(formData.amount))} to {formData.receiverName}
              </p>
              
              <label className="block text-gray-700 text-sm font-medium mb-2">4-Digit PIN</label>
              <input
                type="password"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
                maxLength={4}
                placeholder="Enter your 4-digit PIN"
                className={`w-full p-3 border ${errors.pin ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              {errors.pin && <p className="text-red-500 text-xs mt-1">{errors.pin}</p>}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPinModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handlePinSubmit}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300"
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transfer;