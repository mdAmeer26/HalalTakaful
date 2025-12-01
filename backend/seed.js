const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Plan = require('./models/Plan');

// Load env vars
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@halaltakaful.com',
    password: 'admin123',
    role: 'admin',
    phone: '+1234567890'
  },
  {
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    password: 'password123',
    role: 'user',
    phone: '+1234567891'
  },
  {
    name: 'Fatima Ali',
    email: 'fatima@example.com',
    password: 'password123',
    role: 'user',
    phone: '+1234567892'
  }
];

const plans = [
  {
    name: 'Health Takaful Premium',
    description: 'Comprehensive health coverage for you and your family',
    type: 'health',
    monthlyContribution: 12500,
    tabarruAmount: 11250, // 90% to shared pool
    wakalahFee: 1250, // 10% service fee
    wakalahPercentage: 10,
    mudarabahShare: 30, // 30% profit share from Halal investments
    coverage: 40000000,
    benefits: [
      'Hospitalization coverage',
      'Outpatient services',
      'Prescription medications',
      'Preventive care',
      'Emergency services'
    ],
    features: [
      'Family coverage available',
      'Cashless claims',
      '24/7 support',
      'Pre-existing conditions covered after 6 months'
    ],
    isActive: true,
    shariahCertified: true,
    investmentDetails: 'Fund invested in Sukuk (Islamic bonds) and Shariah-compliant equity portfolios'
  },
  {
    name: 'Life Takaful',
    description: 'Protect your family\'s future with Shariah-compliant life coverage',
    type: 'life',
    monthlyContribution: 16500,
    tabarruAmount: 14850, // 90% to shared pool
    wakalahFee: 1650, // 10% service fee
    wakalahPercentage: 10,
    mudarabahShare: 40, // 40% profit share from Halal investments
    coverage: 82500000,
    benefits: [
      'Death benefit',
      'Critical illness coverage',
      'Permanent disability',
      'Family protection',
      'Investment component (Halal only)'
    ],
    features: [
      'Tabarru fund participation',
      'Surplus distribution',
      'Flexible contribution amounts',
      'Nominee protection'
    ],
    isActive: true,
    shariahCertified: true,
    investmentDetails: 'Fund invested in Islamic real estate and Halal stock portfolios (No interest, no haram industries)'
  },
  {
    name: 'Auto Takaful Standard',
    description: 'Complete vehicle protection according to Islamic principles',
    type: 'auto',
    monthlyContribution: 8250,
    tabarruAmount: 7425, // 90% to shared pool
    wakalahFee: 825, // 10% service fee
    wakalahPercentage: 10,
    mudarabahShare: 25, // 25% profit share from Halal investments
    coverage: 16500000,
    benefits: [
      'Accident coverage',
      'Theft protection',
      'Third-party liability',
      'Natural disaster coverage',
      'Roadside assistance'
    ],
    features: [
      'Workshop selection',
      'Fast claim processing',
      'Replacement vehicle',
      'Windscreen coverage'
    ],
    isActive: true,
    shariahCertified: true,
    investmentDetails: 'Fund invested in Shariah-compliant commodities and Murabaha contracts'
  },
  {
    name: 'Property Takaful',
    description: 'Safeguard your home and assets the halal way',
    type: 'property',
    monthlyContribution: 14900,
    tabarruAmount: 13410, // 90% to shared pool
    wakalahFee: 1490, // 10% service fee
    wakalahPercentage: 10,
    mudarabahShare: 35, // 35% profit share from Halal investments
    coverage: 62000000,
    benefits: [
      'Fire and natural disasters',
      'Theft and burglary',
      'Property damage',
      'Personal liability',
      'Temporary accommodation'
    ],
    features: [
      'Contents coverage',
      'Rebuilding cost',
      'Alternative accommodation',
      'Legal liability protection'
    ],
    isActive: true,
    shariahCertified: true,
    investmentDetails: 'Fund invested in Islamic infrastructure projects and Halal REITs'
  }
];

const seedDB = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Plan.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Insert plans
    const adminUser = createdUsers.find(u => u.role === 'admin');
    const plansWithCreator = plans.map(plan => ({
      ...plan,
      createdBy: adminUser._id
    }));
    
    const createdPlans = await Plan.insertMany(plansWithCreator);
    console.log(`✅ Created ${createdPlans.length} plans`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login credentials:');
    console.log('Admin: admin@halaltakaful.com / admin123');
    console.log('User: ahmed@example.com / password123');
    console.log('User: fatima@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
