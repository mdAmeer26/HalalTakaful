import React, { useState, useEffect } from 'react'
import { Heart, Users, Shield, TrendingUp, CheckCircle, CreditCard, Smartphone, Wallet } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Donate = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(1) // 1: Details, 2: Payment Method
  const [donationType, setDonationType] = useState('one-time')
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dedication: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000, 25000]

  const paymentMethods = [
    { id: 'phonepe', name: 'PhonePe', icon: '📱', color: 'purple' },
    { id: 'gpay', name: 'Google Pay', icon: '🔵', color: 'blue' },
    { id: 'paytm', name: 'Paytm', icon: '💙', color: 'sky' },
    { id: 'upi', name: 'UPI', icon: '🔗', color: 'green' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', color: 'gray' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦', color: 'indigo' }
  ]

  // Check for payment success on component mount
  useEffect(() => {
    const paymentStatus = searchParams.get('payment')
    const donationAmount = searchParams.get('amount')
    
    if (paymentStatus === 'success') {
      setShowSuccess(true)
      if (donationAmount) {
        setAmount(parseInt(donationAmount))
      }
      // Clear URL parameters after showing success
      setTimeout(() => {
        navigate('/donate', { replace: true })
      }, 3000)
    } else if (paymentStatus === 'failed') {
      alert('Payment failed. Please try again.')
      navigate('/donate', { replace: true })
    }
  }, [searchParams, navigate])

  const handleContinueToPayment = (e) => {
    e.preventDefault()
    if (!selectedAmount || !formData.name || !formData.email || !formData.phone) {
      alert('Please fill all required fields')
      return
    }
    setStep(2)
  }

  const handlePaymentMethodSelect = async (method) => {
    setPaymentMethod(method.id)
    setProcessingPayment(true)
    
    // Save donation intent to localStorage
    const donationData = {
      amount: selectedAmount,
      type: donationType,
      method: method.id,
      donor: formData,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('pendingDonation', JSON.stringify(donationData))

    // Simulate payment gateway redirect
    setTimeout(() => {
      initiatePayment(method.id, selectedAmount, donationData)
    }, 1000)
  }

  const initiatePayment = (methodId, amount, donationData) => {
    // For demo purposes, simulate payment confirmation
    const confirmed = window.confirm(
      `🔐 SECURE PAYMENT\n\n` +
      `You will be redirected to ${methodId.toUpperCase()} to complete payment of ₹${parseInt(amount).toLocaleString('en-IN')}.\n\n` +
      `${donationType === 'monthly' ? '✅ Monthly auto-debit will be set up for recurring donations.\n\n' : ''}` +
      `After successful payment, you'll be automatically redirected back to our website.\n\n` +
      `Click OK to proceed to ${methodId.toUpperCase()} payment page.`
    )
    
    if (confirmed) {
      // Simulate payment processing
      setTimeout(() => {
        // Save donation to backend
        saveDonationToBackend(donationData)
        // Redirect back with success
        window.location.href = `/donate?payment=success&amount=${amount}&type=${donationType}`
      }, 2000)
    } else {
      setProcessingPayment(false)
      setPaymentMethod('')
    }
  }

  const saveDonationToBackend = async (donationData) => {
    // In production, call your backend API
    try {
      // const response = await fetch('http://localhost:5000/api/donations', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(donationData)
      // })
      
      // For monthly donations, set up auto-debit
      if (donationData.type === 'monthly') {
        // Backend would create a subscription with payment gateway
        console.log('Setting up monthly auto-debit for:', donationData)
      }
      
      localStorage.removeItem('pendingDonation')
    } catch (error) {
      console.error('Error saving donation:', error)
    }
  }

  const selectedAmount = customAmount || amount

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-gold-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Make a Tabarru Donation
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Strengthen our mutual assistance pool and help fellow members in need. 
              Your voluntary Tabarru contribution embodies the spirit of Islamic solidarity.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="card">
              {/* Progress Indicator */}
              {!showSuccess && (
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        1
                      </div>
                      <span className={`text-sm font-semibold ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                        Details
                      </span>
                    </div>
                    <div className="flex-1 h-1 mx-4 bg-gray-200">
                      <div className={`h-full transition-all duration-300 ${
                        step >= 2 ? 'bg-primary-600 w-full' : 'w-0'
                      }`}></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        2
                      </div>
                      <span className={`text-sm font-semibold ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                        Payment
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {showSuccess ? 'Donation Successful!' : step === 1 ? 'Your Voluntary Contribution' : 'Choose Payment Method'}
              </h2>

              {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-green-900">JazakAllah Khair! Payment Successful</h3>
                      <p className="text-sm text-green-700 mt-2">
                        Your generous Tabarru of <span className="font-bold">₹{parseInt(selectedAmount || 0).toLocaleString('en-IN')}</span> has been successfully processed and added to the mutual pool.
                      </p>
                      {searchParams.get('type') === 'monthly' && (
                        <p className="text-sm text-green-700 mt-2">
                          ✅ <strong>Monthly Auto-Debit Activated:</strong> Your contribution of ₹{parseInt(selectedAmount || 0).toLocaleString('en-IN')} will be automatically deducted on the 1st of every month.
                        </p>
                      )}
                      <p className="text-sm text-green-700 mt-3 italic">
                        May Allah accept your donation and multiply your rewards abundantly. Your contribution will help fellow members facing difficulties.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-300 mt-4">
                    <p className="text-xs text-gray-600 mb-2 font-semibold">📄 Donation Receipt</p>
                    <div className="text-sm space-y-1">
                      <p><span className="text-gray-600">Transaction ID:</span> <span className="font-mono font-semibold">TKF{Date.now()}</span></p>
                      <p><span className="text-gray-600">Amount:</span> <span className="font-semibold">₹{parseInt(selectedAmount || 0).toLocaleString('en-IN')}</span></p>
                      <p><span className="text-gray-600">Type:</span> <span className="font-semibold capitalize">{searchParams.get('type') || donationType}</span></p>
                      <p><span className="text-gray-600">Date:</span> <span className="font-semibold">{new Date().toLocaleString('en-IN')}</span></p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setShowSuccess(false)
                      setStep(1)
                      setAmount('')
                      setCustomAmount('')
                      setFormData({ name: '', email: '', phone: '', dedication: '' })
                    }}
                    className="btn-primary w-full mt-4"
                  >
                    Make Another Donation
                  </button>
                </div>
              )}

              {!showSuccess && step === 1 && (
                <form onSubmit={handleContinueToPayment}>
                  {/* Donation Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Donation Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setDonationType('one-time')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          donationType === 'one-time'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <Heart className={`h-6 w-6 mx-auto mb-2 ${
                          donationType === 'one-time' ? 'text-primary-600' : 'text-gray-400'
                        }`} />
                        <div className="font-semibold text-gray-900">One-Time</div>
                        <div className="text-sm text-gray-600">Single donation</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationType('monthly')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          donationType === 'monthly'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <TrendingUp className={`h-6 w-6 mx-auto mb-2 ${
                          donationType === 'monthly' ? 'text-primary-600' : 'text-gray-400'
                        }`} />
                        <div className="font-semibold text-gray-900">Monthly</div>
                        <div className="text-sm text-gray-600">Auto-debit enabled</div>
                      </button>
                    </div>
                    {donationType === 'monthly' && (
                      <p className="mt-2 text-sm text-primary-600 bg-primary-50 p-3 rounded-lg">
                        💡 Monthly donations will be automatically deducted on the 1st of every month. You can cancel anytime from your dashboard.
                      </p>
                    )}
                  </div>

                  {/* Amount Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Amount
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {predefinedAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setAmount(amt)
                            setCustomAmount('')
                          }}
                          className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                            amount === amt && !customAmount
                              ? 'border-primary-600 bg-primary-50 text-primary-600'
                              : 'border-gray-200 hover:border-primary-300 text-gray-700'
                          }`}
                        >
                          ₹{amt.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Or enter custom amount:</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value)
                            setAmount('')
                          }}
                          placeholder="Enter amount"
                          className="input pl-8"
                          min="100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Your Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="input"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input"
                            placeholder="your@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="input"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dedication (Optional)
                        </label>
                        <textarea
                          value={formData.dedication}
                          onChange={(e) => setFormData({ ...formData, dedication: e.target.value })}
                          className="input"
                          rows="3"
                          placeholder="Dedicate this donation in memory of someone or for a special intention..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Islamic Declaration */}
                  <div className="mb-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
                    <h4 className="font-semibold text-primary-900 mb-2">Tabarru Declaration</h4>
                    <p className="text-sm text-primary-800">
                      I confirm this is a voluntary Tabarru (donation) contribution with the intention 
                      of mutual assistance (Takaful). I understand this donation will be used exclusively 
                      to help fellow members facing difficulties, and I seek Allah's pleasure through this act.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!selectedAmount || !formData.name || !formData.email || !formData.phone}
                    className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment →
                  </button>
                </form>
              )}

              {!showSuccess && step === 2 && (
                <div>
                  {/* Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Donation Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-bold text-gray-900">₹{parseInt(selectedAmount).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-semibold text-gray-900 capitalize">{donationType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Donor:</span>
                        <span className="font-semibold text-gray-900">{formData.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentMethodSelect(method)}
                        disabled={processingPayment}
                        className={`p-4 rounded-lg border-2 transition-all hover:border-primary-400 hover:shadow-md ${
                          paymentMethod === method.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200'
                        } ${processingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="text-3xl mb-2">{method.icon}</div>
                        <div className="font-semibold text-gray-900 text-sm">{method.name}</div>
                      </button>
                    ))}
                  </div>

                  {processingPayment && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                        <p className="text-sm text-blue-900">
                          Redirecting to payment gateway... Please do not close this window.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Security Note */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <p className="font-semibold text-gray-900 mb-1">Secure Payment</p>
                        <p>All transactions are encrypted and secure. You'll be redirected to the payment gateway and returned here after payment completion.</p>
                      </div>
                    </div>
                  </div>

                  {/* Back Button */}
                  <button
                    onClick={() => setStep(1)}
                    disabled={processingPayment}
                    className="btn-secondary w-full"
                  >
                    ← Back to Details
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Impact Sidebar */}
          <div className="space-y-6">
            {/* Current Pool Status */}
            <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
              <Shield className="h-12 w-12 mb-4 text-gold-300" />
              <h3 className="text-xl font-bold mb-2">Current Pool Status</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-primary-100 text-sm">Total Pool Balance</p>
                  <p className="text-2xl font-bold">₹6.3 Crores</p>
                </div>
                <div>
                  <p className="text-primary-100 text-sm">Members Helped This Month</p>
                  <p className="text-2xl font-bold">47 Families</p>
                </div>
                <div>
                  <p className="text-primary-100 text-sm">Total Assistance Released</p>
                  <p className="text-2xl font-bold">₹18.2 Crores</p>
                </div>
              </div>
            </div>

            {/* Impact Stories */}
            <div className="card">
              <Users className="h-8 w-8 text-primary-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-3">Your Impact</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p>
                    <span className="font-semibold">100% Transparent:</span> Every rupee is tracked and 
                    visible on our transparency dashboard
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p>
                    <span className="font-semibold">Shariah Compliant:</span> All investments follow 
                    strict Islamic principles - no Riba, no Haram
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p>
                    <span className="font-semibold">Direct Help:</span> Your donation directly assists 
                    verified members with medical emergencies
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p>
                    <span className="font-semibold">Tax Benefits:</span> Eligible for 80G tax deduction 
                    under Income Tax Act
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Donations */}
            <div className="card">
              <h3 className="font-bold text-gray-900 mb-3">Recent Donations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Member #1247</p>
                    <p className="text-gray-600 text-xs">2 hours ago</p>
                  </div>
                  <span className="font-semibold text-primary-600">₹5,000</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Member #8932</p>
                    <p className="text-gray-600 text-xs">5 hours ago</p>
                  </div>
                  <span className="font-semibold text-primary-600">₹10,000</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Member #3421</p>
                    <p className="text-gray-600 text-xs">1 day ago</p>
                  </div>
                  <span className="font-semibold text-primary-600">₹2,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Member #5678</p>
                    <p className="text-gray-600 text-xs">2 days ago</p>
                  </div>
                  <span className="font-semibold text-primary-600">₹25,000</span>
                </div>
              </div>
            </div>

            {/* Quranic Verse */}
            <div className="card bg-gradient-to-br from-gold-100 to-gold-200 border-2 border-gold-300">
              <p className="text-gray-800 text-sm italic mb-2">
                "The example of those who spend their wealth in the way of Allah is like a seed 
                [of grain] which grows seven spikes; in each spike is a hundred grains. And Allah 
                multiplies [His reward] for whom He wills."
              </p>
              <p className="text-xs text-gray-600 font-semibold">- Quran 2:261</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Donate
