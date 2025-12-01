// Dummy data for development until backend is connected

export const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    role: "Business Owner",
    image: "https://ui-avatars.com/api/?name=Ahmed+Hassan&background=16a34a&color=fff",
    text: "HalalTakaful's mutual protection model aligns perfectly with Islamic values. When I needed help, the Tabarru pool supported me immediately. Alhamdulillah!"
  },
  {
    id: 2,
    name: "Fatima Ali",
    role: "Healthcare Professional",
    image: "https://ui-avatars.com/api/?name=Fatima+Ali&background=16a34a&color=fff",
    text: "The transparency is amazing - I know 90% goes to help fellow members and only 10% is the service fee. True Islamic cooperation!"
  },
  {
    id: 3,
    name: "Mohammed Khan",
    role: "Engineer",
    image: "https://ui-avatars.com/api/?name=Mohammed+Khan&background=16a34a&color=fff",
    text: "Finally, protection without Riba or Gharar! The Takaful model is what we've been waiting for. May Allah reward the team!"
  }
]

export const features = [
  {
    id: 1,
    title: "100% Shariah Compliant",
    description: "All Takaful plans certified by Islamic scholars. Based on mutual cooperation, not risk transfer.",
    icon: "Shield"
  },
  {
    id: 2,
    title: "Fast Claims from Pool",
    description: "Submit claims easily. Approved payments come from the Tabarru mutual fund within 48 hours.",
    icon: "Zap"
  },
  {
    id: 3,
    title: "Transparent Tabarru System",
    description: "90% goes to mutual pool, 10% Wakalah fee. Know exactly where every rupee goes.",
    icon: "Eye"
  },
  {
    id: 4,
    title: "Multiple Takaful Plans",
    description: "Choose from Health, Life, Auto, and Property mutual protection plans.",
    icon: "Layers"
  },
  {
    id: 5,
    title: "24/7 Support",
    description: "Our dedicated team is always ready to assist fellow Takaful members.",
    icon: "Headphones"
  },
  {
    id: 6,
    title: "Digital Platform",
    description: "Manage contributions, submit claims, track from mutual pool - anytime, anywhere.",
    icon: "Smartphone"
  }
]

export const takafulPlans = [
  {
    id: 1,
    name: "Health Takaful",
    description: "Comprehensive health coverage for you and your family",
    monthlyContribution: 12500,
    tabarruAmount: 11250, // 90% goes to shared pool
    wakalahFee: 1250, // 10% service fee
    wakalahPercentage: 10,
    mudarabahShare: 30, // 30% profit share from halal investments
    coverage: 40000000,
    benefits: [
      "Hospitalization coverage",
      "Outpatient services",
      "Prescription medications",
      "Preventive care",
      "Emergency services"
    ],
    icon: "Heart",
    investmentDetails: "Fund invested in Sukuk (Islamic bonds) and Shariah-compliant equity"
  },
  {
    id: 2,
    name: "Life Takaful",
    description: "Protect your family's future with Shariah-compliant life coverage",
    monthlyContribution: 16500,
    tabarruAmount: 14850, // 90% goes to shared pool
    wakalahFee: 1650, // 10% service fee
    wakalahPercentage: 10,
    mudarabahShare: 40, // 40% profit share from halal investments
    coverage: 82500000,
    benefits: [
      "Death benefit",
      "Critical illness coverage",
      "Permanent disability",
      "Family protection",
      "Investment component (Halal only)"
    ],
    icon: "Users",
    investmentDetails: "Fund invested in Islamic real estate and Halal stock portfolios"
  },
  {
    id: 3,
    name: "Auto Takaful",
    description: "Complete vehicle protection according to Islamic principles",
    monthlyContribution: 8250,
    tabarruAmount: 7425, // 90% goes to shared pool
    wakalahFee: 825, // 10% service fee
    wakalahPercentage: 10,
    mudarabahShare: 25, // 25% profit share from halal investments
    coverage: 16500000,
    benefits: [
      "Accident coverage",
      "Theft protection",
      "Third-party liability",
      "Natural disaster coverage",
      "Roadside assistance"
    ],
    icon: "Car",
    investmentDetails: "Fund invested in Shariah-compliant commodities and Murabaha contracts"
  },
  {
    id: 4,
    name: "Property Takaful",
    description: "Safeguard your home and assets the halal way",
    monthlyContribution: 14900,
    tabarruAmount: 13410, // 90% goes to shared pool
    wakalahFee: 1490, // 10% service fee
    wakalahPercentage: 10,
    mudarabahShare: 35, // 35% profit share from halal investments
    coverage: 62000000,
    benefits: [
      "Fire and natural disasters",
      "Theft and burglary",
      "Property damage",
      "Personal liability",
      "Temporary accommodation"
    ],
    icon: "Home",
    investmentDetails: "Fund invested in Islamic infrastructure and Halal REITs"
  }
]

export const activePolicies = [
  {
    id: 1,
    policyNumber: "HT-2024-001234",
    planName: "Health Takaful Premium",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2025-01-14",
    monthlyContribution: 12500,
    coverage: 40000000,
    nextPaymentDate: "2024-12-15"
  },
  {
    id: 2,
    policyNumber: "HT-2024-005678",
    planName: "Auto Takaful Standard",
    status: "Active",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    monthlyContribution: 8250,
    coverage: 16500000,
    nextPaymentDate: "2024-12-01"
  }
]

export const recentClaims = [
  {
    id: 1,
    claimNumber: "CLM-2024-0123",
    type: "Health",
    description: "Hospital admission - Appendectomy",
    submittedDate: "2024-11-15",
    status: "Approved",
    amount: 1240000,
    approvedAmount: 1240000
  },
  {
    id: 2,
    claimNumber: "CLM-2024-0456",
    type: "Auto",
    description: "Minor accident repair",
    submittedDate: "2024-10-28",
    status: "Processing",
    amount: 700000,
    approvedAmount: null
  },
  {
    id: 3,
    claimNumber: "CLM-2024-0789",
    type: "Health",
    description: "Dental procedure",
    submittedDate: "2024-09-10",
    status: "Approved",
    amount: 206000,
    approvedAmount: 181000
  }
]

export const paymentHistory = [
  {
    id: 1,
    date: "2024-11-15",
    policyNumber: "HT-2024-001234",
    planName: "Health Takaful Premium",
    amount: 12500,
    status: "Paid",
    method: "Credit Card"
  },
  {
    id: 2,
    date: "2024-11-01",
    policyNumber: "HT-2024-005678",
    planName: "Auto Takaful Standard",
    amount: 8250,
    status: "Paid",
    method: "Bank Transfer"
  },
  {
    id: 3,
    date: "2024-10-15",
    policyNumber: "HT-2024-001234",
    planName: "Health Takaful Premium",
    amount: 12500,
    status: "Paid",
    method: "Credit Card"
  }
]
