import React, { useState, useEffect } from 'react'
import { Upload, FileText, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ClaimCard from '../components/ClaimCard'
import { recentClaims } from '../utils/dummyData'

const Claims = () => {
  const [claims, setClaims] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    policyNumber: '',
    claimType: '',
    description: '',
    amount: '',
    incidentDate: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    accountType: 'savings'
  })
  const [files, setFiles] = useState([])
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    // Fetch claims from API when backend is ready
    // const fetchClaims = async () => {
    //   try {
    //     const response = await claimsAPI.getAllClaims()
    //     setClaims(response.data)
    //   } catch (error) {
    //     console.error('Error fetching claims:', error)
    //   }
    // }
    // fetchClaims()

    // Using dummy data for now
    setClaims(recentClaims)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Submit claim to API when backend is ready
      // const formDataToSend = new FormData()
      // Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]))
      // files.forEach(file => formDataToSend.append('files', file))
      // await claimsAPI.submitClaim(formDataToSend)

      // Demo submission
      setSubmitSuccess(true)
      setTimeout(() => {
        setSubmitSuccess(false)
        setShowForm(false)
        setFormData({
          policyNumber: '',
          claimType: '',
          description: '',
          amount: '',
          incidentDate: '',
          accountHolderName: '',
          accountNumber: '',
          ifscCode: '',
          bankName: '',
          branchName: '',
          accountType: 'savings'
        })
        setFiles([])
      }, 2000)
    } catch (error) {
      console.error('Error submitting claim:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Claims from Mutual Pool</h1>
            <p className="text-gray-600">Request assistance from the Tabarru pool when facing emergencies</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary mt-4 md:mt-0"
          >
            {showForm ? 'Cancel' : 'Submit New Claim'}
          </button>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <p className="text-green-800 font-semibold">
              Claim submitted successfully! We'll review it within 24-48 hours.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Claim Submission Form */}
            {showForm && (
              <div className="card mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Assistance from Tabarru Pool</h2>
                
                {/* Required Documents Alert */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-bold text-yellow-800">Required Documents for Claim Approval</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p className="font-semibold mb-2">You MUST upload ALL of the following:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li><strong>Hospital Bills</strong> - Original bills with itemized charges</li>
                          <li><strong>Medical Reports</strong> - Diagnosis and treatment details</li>
                          <li><strong>Accident Photos</strong> (if applicable) - Clear images showing damage/injury</li>
                          <li><strong>Hospital Approval Letter</strong> - Special letter signed by:</li>
                          <ul className="list-circle list-inside ml-6 mt-1">
                            <li>Hospital Director (with official stamp)</li>
                            <li>Treating Doctor (with medical registration number)</li>
                          </ul>
                          <li><strong>Police Report</strong> (for accidents) - FIR copy</li>
                          <li><strong>Discharge Summary</strong> - Final medical summary</li>
                        </ul>
                        <p className="mt-3 font-semibold text-yellow-900">⚠️ Claims without proper documentation will be automatically rejected.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Policy Number
                    </label>
                    <input
                      type="text"
                      id="policyNumber"
                      name="policyNumber"
                      required
                      className="input-field"
                      placeholder="HT-2024-001234"
                      value={formData.policyNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="claimType" className="block text-sm font-medium text-gray-700 mb-2">
                      Claim Type
                    </label>
                    <select
                      id="claimType"
                      name="claimType"
                      required
                      className="input-field"
                      value={formData.claimType}
                      onChange={handleChange}
                    >
                      <option value="">Select claim type</option>
                      <option value="health">Health</option>
                      <option value="life">Life</option>
                      <option value="auto">Auto</option>
                      <option value="property">Property</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Incident Date
                    </label>
                    <input
                      type="date"
                      id="incidentDate"
                      name="incidentDate"
                      required
                      className="input-field"
                      value={formData.incidentDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                      Claim Amount (₹)
                    </label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      required
                      className="input-field"
                      placeholder="50000"
                      value={formData.amount}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">Amount you need from the Tabarru mutual pool</p>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      required
                      className="input-field"
                      placeholder="Provide detailed information: What happened? When? Where? Treatment received?"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Bank Account Details Section */}
                  <div className="col-span-1 md:col-span-2 bg-primary-50 border-2 border-primary-200 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-primary-900 mb-4 flex items-center">
                      🏦 Bank Account Details for Fund Transfer
                    </h3>
                    <p className="text-sm text-primary-800 mb-4">
                      Please provide accurate bank account details. Approved claim amounts will be directly transferred to this account.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="text-red-600">*</span> Account Holder Name
                        </label>
                        <input
                          type="text"
                          id="accountHolderName"
                          name="accountHolderName"
                          required
                          className="input-field"
                          placeholder="As per bank records"
                          value={formData.accountHolderName}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="text-red-600">*</span> Account Number
                        </label>
                        <input
                          type="text"
                          id="accountNumber"
                          name="accountNumber"
                          required
                          className="input-field"
                          placeholder="Enter account number"
                          value={formData.accountNumber}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="text-red-600">*</span> IFSC Code
                        </label>
                        <input
                          type="text"
                          id="ifscCode"
                          name="ifscCode"
                          required
                          className="input-field"
                          placeholder="e.g., SBIN0001234"
                          value={formData.ifscCode}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="text-red-600">*</span> Bank Name
                        </label>
                        <input
                          type="text"
                          id="bankName"
                          name="bankName"
                          required
                          className="input-field"
                          placeholder="e.g., State Bank of India"
                          value={formData.bankName}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="branchName" className="block text-sm font-medium text-gray-700 mb-2">
                          Branch Name (Optional)
                        </label>
                        <input
                          type="text"
                          id="branchName"
                          name="branchName"
                          className="input-field"
                          placeholder="e.g., Mumbai Main Branch"
                          value={formData.branchName}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="text-red-600">*</span> Account Type
                        </label>
                        <select
                          id="accountType"
                          name="accountType"
                          required
                          className="input-field"
                          value={formData.accountType}
                          onChange={handleChange}
                        >
                          <option value="savings">Savings Account</option>
                          <option value="current">Current Account</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4 bg-yellow-50 border border-yellow-300 rounded-lg p-3">
                      <p className="text-xs text-yellow-800">
                        <strong>⚠️ Important:</strong> Please double-check your bank details. Incorrect information may delay or prevent fund transfer. 
                        The account holder name should match your registered name with HalalTakaful.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="text-red-600">*</span> Upload Required Documents
                    </label>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                      <p className="text-sm font-semibold text-red-800 mb-2">📋 Document Checklist (ALL Required):</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-red-700">
                        <div className="flex items-start">
                          <span className="mr-2">☐</span>
                          <span>Hospital bills (itemized)</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2">☐</span>
                          <span>Medical reports/diagnosis</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2">☐</span>
                          <span>Accident photos (if applicable)</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2">☐</span>
                          <span>Police FIR (for accidents)</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2">☐</span>
                          <span className="font-bold">Hospital approval letter</span>
                        </div>
                        <div className="flex items-start">
                          <span className="mr-2">☐</span>
                          <span>Discharge summary</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileUpload"
                      />
                      <label htmlFor="fileUpload" className="cursor-pointer">
                        <span className="text-primary-600 hover:text-primary-700 font-semibold">
                          Click to upload documents
                        </span>
                        <span className="text-gray-600"> or drag and drop</span>
                      </label>
                      <p className="text-sm text-gray-500 mt-2">
                        PDF, JPG, PNG up to 10MB each (Upload all required documents)
                      </p>
                      <p className="text-xs text-red-600 font-semibold mt-2">
                        Minimum 6 documents required for processing
                      </p>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-semibold text-gray-700">Uploaded Files ({files.length}):</p>
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                            <FileText className="h-4 w-4 text-primary-600" />
                            <span>{file.name}</span>
                            <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">🔍 Verification Process:</h4>
                    <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                      <li>Documents submitted to verification team</li>
                      <li>Hospital approval letter verified for authenticity</li>
                      <li>Director & Doctor signatures cross-checked</li>
                      <li>Bills and medical reports reviewed by medical expert</li>
                      <li>Approval/Rejection within 24-48 hours</li>
                      <li>If approved, amount released from Tabarru pool to your account</li>
                    </ol>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full btn-primary"
                    disabled={files.length < 3}
                  >
                    {files.length < 3 ? 'Upload Required Documents First' : 'Submit Claim for Verification'}
                  </button>
                </form>
              </div>
            )}

            {/* Claims List */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Claims</h2>
              {claims.length > 0 ? (
                <div className="space-y-4">
                  {claims.map((claim) => (
                    <ClaimCard key={claim.id} claim={claim} />
                  ))}
                </div>
              ) : (
                <div className="card text-center py-12">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No claims found</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary mt-4"
                  >
                    Submit Your First Claim
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Claims Process */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Claims Process</h3>
              <ol className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-semibold text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">Submit Claim</p>
                    <p className="text-sm text-gray-600">Fill the form with incident details</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-semibold text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">Review</p>
                    <p className="text-sm text-gray-600">We review within 24-48 hours</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-semibold text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">Approval</p>
                    <p className="text-sm text-gray-600">Get notification of decision</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-semibold text-sm flex-shrink-0">
                    4
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">Payment</p>
                    <p className="text-sm text-gray-600">Receive funds within 3-5 days</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Need Help */}
            <div className="card bg-primary-50 border border-primary-200">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is available 24/7 to assist you with your claims
              </p>
              <button className="w-full btn-primary text-sm">
                Contact Support
              </button>
            </div>

            {/* Required Documents */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Required Documents</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Police report (if applicable)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Medical bills and receipts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Photos of damage</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Repair estimates</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>Any other supporting evidence</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Claims
