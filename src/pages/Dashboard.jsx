import React, { useState, useEffect } from 'react'
import { User, CreditCard, FileText, TrendingUp, DollarSign } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PolicyCard from '../components/PolicyCard'
import ClaimCard from '../components/ClaimCard'
import { activePolicies, recentClaims, paymentHistory } from '../utils/dummyData'

const Dashboard = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name || 'Member'}!
              </h1>
              <p className="text-primary-100">
                Manage your policies, track claims, and view your contributions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-gold-300 text-sm">Total Coverage</p>
                <p className="text-2xl font-bold">₹5.75Cr</p>
              </div>
              <div className="h-12 w-px bg-primary-400"></div>
              <div className="text-center">
                <p className="text-gold-300 text-sm">Active Policies</p>
                <p className="text-2xl font-bold">{activePolicies.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Policies</p>
                <p className="text-2xl font-bold text-gray-900">{activePolicies.length}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-lg">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="card bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Claims</p>
                <p className="text-2xl font-bold text-gray-900">{recentClaims.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Monthly Contribution</p>
                <p className="text-2xl font-bold text-gray-900">₹20,750</p>
              </div>
              <div className="p-3 bg-gold-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-gold-600" />
              </div>
            </div>
          </div>

          <div className="card bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Next Payment</p>
                <p className="text-lg font-bold text-gray-900">Dec 15, 2024</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Policies */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Active Policies</h2>
                <a href="/plans" className="text-primary-600 hover:text-primary-700 font-semibold">
                  View All →
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activePolicies.map((policy) => (
                  <PolicyCard key={policy.id} policy={policy} />
                ))}
              </div>
            </div>

            {/* Recent Claims */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Claims</h2>
                <a href="/claims" className="text-primary-600 hover:text-primary-700 font-semibold">
                  View All →
                </a>
              </div>
              <div className="space-y-4">
                {recentClaims.map((claim) => (
                  <ClaimCard key={claim.id} claim={claim} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="card">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name || 'Member'}</h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
              <button className="w-full btn-secondary text-sm">
                Edit Profile
              </button>
            </div>

            {/* Payment History */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Payments</h3>
              <div className="space-y-3">
                {paymentHistory.slice(0, 3).map((payment) => (
                  <div key={payment.id} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-gray-900">{payment.planName}</span>
                      <span className="text-sm font-semibold text-primary-600">₹{payment.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-xs text-gray-600">{new Date(payment.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-semibold">
                View All Payments →
              </button>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full btn-primary text-sm">
                  Submit New Claim
                </button>
                <button className="w-full btn-secondary text-sm">
                  Browse Plans
                </button>
                <button className="w-full btn-secondary text-sm">
                  Make Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard
