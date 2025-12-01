import React from 'react'
import { CheckCircle, Clock, XCircle, FileText } from 'lucide-react'

const ClaimCard = ({ claim }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'processing':
        return 'bg-yellow-100 text-yellow-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          {getStatusIcon(claim.status)}
          <div>
            <h3 className="font-semibold text-gray-800">{claim.type} Claim</h3>
            <p className="text-xs text-gray-600">Claim #{claim.claimNumber}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(claim.status)}`}>
          {claim.status}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-4">{claim.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Submitted:</span>
          <span className="text-gray-800">
            {new Date(claim.submittedDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Requested:</span>
          <span className="font-semibold text-gray-800">
            ₹{claim.amount.toLocaleString('en-IN')}
          </span>
        </div>
        {claim.approvedAmount !== null && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Paid from Pool:</span>
            <span className="font-semibold text-primary-600">
              ₹{claim.approvedAmount.toLocaleString('en-IN')}
            </span>
          </div>
        )}
        {claim.status === 'approved' && (
          <div className="text-xs text-green-600 bg-green-50 p-2 rounded mt-2">
            ✓ Funded by Tabarru mutual pool
          </div>
        )}
      </div>

      <button className="w-full btn-secondary text-sm">
        View Details
      </button>
    </div>
  )
}

export default ClaimCard
