# HalalTakaful - Islamic Insurance Platform

A modern, Shariah-compliant Islamic insurance (Takaful) platform built with React, Node.js, and MongoDB. This platform embodies the principles of mutual cooperation and Islamic solidarity through a transparent Tabarru (donation) model.

## 🌟 Features

### Core Functionality
- **Islamic Takaful Model**: Implements authentic Takaful principles with Tabarru contributions
- **Transparent Pool System**: Real-time visibility of collected funds, released assistance, and pool balance
- **Multi-Plan Coverage**: Health, Life, Auto, and Property Takaful plans with Wakalah fee structure
- **Claims Management**: Comprehensive claim submission with strict document verification
- **Donation System**: Support the mutual pool with one-time or monthly recurring donations

### Key Highlights
✅ **100% Shariah Compliant** - No Riba (interest), No Gharar (uncertainty), No Haram investments  
✅ **Complete Transparency** - All transactions tracked and visible on transparency dashboard  
✅ **Strict Verification** - Hospital approval letters required with director + doctor signatures  
✅ **Multiple Payment Options** - PhonePe, GPay, Paytm, UPI, Cards, Net Banking  
✅ **Auto-Debit** - Monthly automatic contributions for sustained support  
✅ **Direct Bank Transfer** - Approved claims disbursed directly to recipient's bank account  

## 🏗️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router v6** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication & authorization
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher)
- **npm** or **yarn** package manager

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/mdAmeer26/HalalTakaful.git
cd HalalTakaful
```

### 2. Install Dependencies

#### Install Backend Dependencies
```bash
cd backend
npm install
```

#### Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Environment Setup

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/halaltakaful
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
mongod
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
```

### 5. Seed Database (Optional)

Populate the database with sample data:
```bash
cd backend
node seed.js
```

### 6. Run the Application

#### Option 1: Using Start Scripts (Windows)
```bash
# From project root
start.bat
```

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 7. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api

## 📁 Project Structure

```
HalalTakaful/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── claimController.js   # Claims management
│   │   ├── paymentController.js # Payment processing
│   │   ├── planController.js    # Plan management
│   │   ├── policyController.js  # Policy operations
│   │   └── userController.js    # User management
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── validation.js        # Input validation
│   ├── models/
│   │   ├── Claim.js             # Claim schema
│   │   ├── Payment.js           # Payment schema
│   │   ├── Plan.js              # Plan schema
│   │   ├── Policy.js            # Policy schema
│   │   └── User.js              # User schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── claimRoutes.js       # Claim endpoints
│   │   ├── paymentRoutes.js     # Payment endpoints
│   │   ├── planRoutes.js        # Plan endpoints
│   │   ├── policyRoutes.js      # Policy endpoints
│   │   └── userRoutes.js        # User endpoints
│   ├── seed.js                  # Database seeding
│   ├── server.js                # Express server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ClaimCard.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PlanCard.jsx
│   │   │   ├── PolicyCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── TestimonialCard.jsx
│   │   ├── pages/
│   │   │   ├── Claims.jsx       # Claims submission
│   │   │   ├── Dashboard.jsx    # User dashboard
│   │   │   ├── Donate.jsx       # Donation page
│   │   │   ├── Landing.jsx      # Home page
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Plans.jsx        # Plans listing
│   │   │   ├── Signup.jsx       # Registration
│   │   │   └── Transparency.jsx # Pool transparency
│   │   ├── utils/
│   │   │   ├── api.js           # API client
│   │   │   └── dummyData.js     # Sample data
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🎯 Key Features Explained

### 1. Islamic Takaful Model
The platform implements authentic Takaful principles:
- **Step 1**: Members make Tabarru (donation) contributions
- **Step 2**: Contributions pooled for mutual assistance
- **Step 3**: Ethical earnings through Wakalah/Mudarabah/Operational fees
- **Step 4**: No interest, no forbidden investments

### 2. Transparency Dashboard
Real-time visibility into the mutual pool:
- Total collected contributions: ₹24.5 Crores
- Total assistance released: ₹18.2 Crores
- Current pool balance: ₹6.3 Crores
- Members helped this month: 47 families
- Monthly breakdown with utilization rates
- Recent assistance releases with member privacy

### 3. Donation System
Multi-option donation system:
- **One-time donations**: Single contributions to strengthen pool
- **Monthly auto-debit**: Recurring donations on 1st of every month
- **Payment methods**: PhonePe, GPay, Paytm, UPI, Cards, Net Banking
- **Payment flow**: Redirect to gateway → Complete payment → Auto-redirect back
- **Receipts**: Digital donation receipts with transaction IDs

### 4. Claims Management
Comprehensive claim submission with verification:
- **Required documents**:
  - Hospital bills (itemized)
  - Medical reports/diagnosis
  - Accident photos (if applicable)
  - Hospital approval letter (director + doctor signatures)
  - Police FIR (for accidents)
  - Discharge summary
- **Bank details**: Account holder name, account number, IFSC code, bank name
- **Verification process**: Multi-level document verification with signature checks
- **Direct transfer**: Approved amounts transferred directly to member's bank account

### 5. Plan Coverage
Four comprehensive Takaful plans:
- **Health Takaful**: Medical expenses, hospitalization, surgeries
- **Life Takaful**: Family protection, inheritance support
- **Auto Takaful**: Vehicle damage, theft, third-party liability
- **Property Takaful**: Home/business property protection

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for user passwords
- **Protected Routes**: Frontend route protection for authenticated users
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured CORS policies
- **Environment Variables**: Sensitive data stored in .env files

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Plans
- `GET /api/plans` - Get all Takaful plans
- `GET /api/plans/:id` - Get single plan
- `POST /api/plans` - Create plan (Admin)
- `PUT /api/plans/:id` - Update plan (Admin)
- `DELETE /api/plans/:id` - Delete plan (Admin)

### Policies
- `GET /api/policies` - Get user's policies
- `GET /api/policies/:id` - Get single policy
- `POST /api/policies` - Purchase new policy
- `PUT /api/policies/:id` - Update policy

### Claims
- `GET /api/claims` - Get user's claims
- `GET /api/claims/:id` - Get single claim
- `POST /api/claims` - Submit new claim
- `PUT /api/claims/:id` - Update claim status (Admin)

### Payments
- `GET /api/payments` - Get user's payments
- `POST /api/payments` - Process payment
- `GET /api/payments/history` - Payment history

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend:
```bash
cd frontend
npm run build
```
2. Deploy the `dist` folder to your hosting platform

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables on hosting platform
2. Deploy backend code
3. Update frontend API base URL

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Update `MONGODB_URI` in environment variables
3. Whitelist deployment server IP

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Developer**: Mohammad Ameer
- **GitHub**: [@mdAmeer26](https://github.com/mdAmeer26)

## 📞 Support

For support, email support@halaltakaful.com or open an issue on GitHub.

## 🙏 Acknowledgments

- Islamic finance scholars for Takaful model guidance
- Open source community for amazing tools and libraries
- All contributors and supporters of this project

---

**May Allah (SWT) accept this effort and make it beneficial for the Ummah. Ameen.**

*"The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills." - Quran 2:261*
