import React from 'react'
import { Calendar, FileText } from 'lucide-react'

const PolicyCard = ({ policy }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'expired':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{policy.planName}</h3>
          <p className="text-sm text-gray-600">Policy #{policy.policyNumber}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(policy.status)}`}>
          {policy.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Coverage:</span>
          <span className="text-sm font-semibold text-gray-800">
            ₹{policy.coverage.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Monthly Contribution:</span>
          <span className="text-sm font-semibold text-primary-600">
            ₹{policy.monthlyContribution.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">→ Tabarru (Pool):</span>
          <span className="text-gray-700">₹{Math.round(policy.monthlyContribution * 0.9).toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">→ Wakalah Fee (10%):</span>
          <span className="text-gray-700">₹{Math.round(policy.monthlyContribution * 0.1).toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Valid Until:</span>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-800">
              {new Date(policy.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-600 mb-1">Next Payment Due:</p>
        <p className="text-sm font-semibold text-gray-800">
          {new Date(policy.nextPaymentDate).toLocaleDateString()}
        </p>
      </div>

      <button className="w-full mt-4 btn-secondary flex items-center justify-center space-x-2">
        <FileText className="h-4 w-4" />
        <span>View Details</span>
      </button>
    </div>
  )
}

export default PolicyCard
