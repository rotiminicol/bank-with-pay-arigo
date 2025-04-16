import  { useState } from 'react';

const International = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientAddress: '',
    recipientCountry: '',
    bankName: '',
    accountNumber: '',
    swiftCode: '',
    amount: '',
    transferCurrency: 'USD',
    transferPurpose: '',
    senderReference: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowConfirmation(true);
    }, 1500);
  };

  const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF"];
  const transferPurposes = [
    "Business Payment", 
    "Family Support", 
    "Education Fees", 
    "Medical Expenses",
    "Property Purchase",
    "Investment",
    "Other"
  ];

  const resetForm = () => {
    setFormData({
      recipientName: '',
      recipientAddress: '',
      recipientCountry: '',
      bankName: '',
      accountNumber: '',
      swiftCode: '',
      amount: '',
      transferCurrency: 'USD',
      transferPurpose: '',
      senderReference: ''
    });
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-500 p-4">
            <div className="flex justify-center">
              <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">Transfer Initiated!</h2>
            <div className="space-y-4">
              <p className="text-gray-700">Your international transfer request has been successfully initiated. Heres a summary of your transaction:</p>
              
              <div className="border-t border-b border-gray-200 py-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Amount:</span>
                  <span className="font-bold">{formData.amount} {formData.transferCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Recipient:</span>
                  <span>{formData.recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Bank:</span>
                  <span>{formData.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Purpose:</span>
                  <span>{formData.transferPurpose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Reference:</span>
                  <span>{formData.senderReference}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">A confirmation email with these details has been sent to your registered email address.</p>
            </div>
            
            <div className="mt-6">
              <button
                onClick={resetForm}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300"
              >
                Make Another Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">International Transfer</h1>
          <p className="mt-2 text-gray-600">Send money internationally from Nigeria with ArigoPay</p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Progress Indicator */}
          <div className="bg-blue-600 h-2"></div>
          
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recipient Details</h2>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">
                  Recipients Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="recipientName"
                    id="recipientName"
                    required
                    value={formData.recipientName}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="recipientCountry" className="block text-sm font-medium text-gray-700">
                  Recipients Country
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="recipientCountry"
                    id="recipientCountry"
                    required
                    value={formData.recipientCountry}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-700">
                  Recipients Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="recipientAddress"
                    id="recipientAddress"
                    required
                    value={formData.recipientAddress}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pt-4">Bank Details</h2>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                  Bank Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="bankName"
                    id="bankName"
                    required
                    value={formData.bankName}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="swiftCode" className="block text-sm font-medium text-gray-700">
                  SWIFT/BIC Code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="swiftCode"
                    id="swiftCode"
                    required
                    value={formData.swiftCode}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                  Account Number / IBAN
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    required
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pt-4">Transfer Details</h2>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    min="1"
                    required
                    value={formData.amount}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="transferCurrency" className="block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <div className="mt-1">
                  <select
                    id="transferCurrency"
                    name="transferCurrency"
                    required
                    value={formData.transferCurrency}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="transferPurpose" className="block text-sm font-medium text-gray-700">
                  Purpose of Transfer
                </label>
                <div className="mt-1">
                  <select
                    id="transferPurpose"
                    name="transferPurpose"
                    required
                    value={formData.transferPurpose}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="" disabled>Select purpose</option>
                    {transferPurposes.map(purpose => (
                      <option key={purpose} value={purpose}>{purpose}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="senderReference" className="block text-sm font-medium text-gray-700">
                  Your Reference (Optional)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="senderReference"
                    id="senderReference"
                    value={formData.senderReference}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6 pt-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-blue-700">
                        International transfers typically take 2-5 business days to process. Fees may apply depending on the receiving bank.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Continue to Review'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Trusted by Nigerian Banks</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {['First Bank', 'UBA', 'Zenith Bank', 'GTBank', 'Access Bank'].map((bank) => (
              <div key={bank} className="flex items-center justify-center bg-white p-4 rounded-md shadow-sm">
                <span className="font-medium text-gray-800">{bank}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default International;