# HalalTakaful - Complete Full Stack Application

## 🕌 Project Overview

Complete **Islamic Takaful (Mutual Protection) Platform** with modern frontend and robust backend.

### What is Takaful?
**Takaful** (‫تكافل‎) is an Islamic alternative to conventional insurance based on **mutual cooperation** and **Shariah compliance**.

**Core Principles:**
1. 🤲 **Tabarru (Donation):** Participants contribute to a shared pool (NOT premiums)
2. 🤝 **Mutual Help:** The pool assists members facing emergencies
3. 💰 **Ethical Revenue:** Platform earns through Wakalah Fee, Mudarabah profit-sharing, and transparent operational charges
4. ✅ **100% Halal:** No interest (Riba), no haram investments, no hidden charges

📖 **[Read Complete Takaful Model Explanation](./TAKAFUL_MODEL.md)**

---

## 📁 Project Structure

```
HalalTakaful/
├── frontend/                    # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Application pages
│   │   ├── utils/              # API & dummy data
│   │   ├── App.jsx             # Main app with routing
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── backend/                     # Node.js + Express + MongoDB
    ├── config/                 # Database configuration
    ├── controllers/            # Business logic
    ├── middleware/             # Auth & validation
    ├── models/                 # Mongoose schemas
    ├── routes/                 # API endpoints
    ├── server.js               # Server entry point
    ├── seed.js                 # Database seeding
    ├── .env                    # Environment variables
    └── package.json
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Setup MongoDB (choose one):
# - Install locally: See MONGODB_SETUP.md
# - Use MongoDB Atlas: https://www.mongodb.com/cloud/atlas

# Update .env with your MongoDB URI
# For Atlas: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/halaltakaful
# For Local: MONGODB_URI=mongodb://localhost:27017/halaltakaful

# Seed database with sample data
npm run seed

# Start backend server
npm run dev
```

Backend runs on: **http://localhost:5000**

### 2. Setup Frontend

```bash
# From project root
npm install

# Start frontend development server
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 🔑 Default Login Credentials

After running `npm run seed`:

**Admin Account:**
- Email: `admin@halaltakaful.com`
- Password: `admin123`

**User Accounts:**
- Email: `ahmed@example.com` / Password: `password123`
- Email: `fatima@example.com` / Password: `password123`

---

## ✨ Features

### Frontend Features
✅ Modern Islamic-themed UI (Green, White, Gold)
✅ Fully responsive (mobile-first)
✅ Landing page with hero, features, testimonials
✅ User authentication (login/signup)
✅ Protected dashboard with stats
✅ Browse Takaful plans with filters
✅ Policy enrollment
✅ Claims submission & tracking
✅ Payment management
✅ Reusable components

### Backend Features
✅ RESTful API architecture
✅ JWT authentication (access + refresh tokens)
✅ Role-based access control (user/admin)
✅ Password hashing with bcrypt
✅ Input validation & sanitization
✅ MongoDB with Mongoose ODM
✅ CORS & security headers
✅ Comprehensive error handling
✅ Auto-generated IDs (policy, claim, transaction)

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Plans (Public)
- `GET /api/plans` - List all plans
- `GET /api/plans/:id` - Get plan details

### Plans (Admin)
- `POST /api/plans` - Create plan
- `PUT /api/plans/:id` - Update plan
- `DELETE /api/plans/:id` - Delete plan

### Policies
- `GET /api/policies` - User policies
- `GET /api/policies/active` - Active policies
- `POST /api/policies/enroll` - Enroll in plan
- `DELETE /api/policies/:id` - Cancel policy

### Claims
- `GET /api/claims` - User claims
- `POST /api/claims` - Submit claim
- `PUT /api/claims/:id/status` - Update status (Admin)

### Payments
- `GET /api/payments` - User payments
- `POST /api/payments` - Create payment
- `PUT /api/payments/:id/complete` - Mark complete

### Users
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users` - All users (Admin)

See `backend/API_TESTING.md` for detailed examples.

---

## 🗄️ Database Models

### User
- Authentication & profile data
- Role (user/admin)
- Password hashing with bcrypt
- Refresh token storage

### Plan (Takaful Structure)
- Plan details (name, description, type)
- **Monthly Contribution:** Total amount paid by participant
- **Tabarru Amount:** Donation to mutual pool (typically 90%)
- **Wakalah Fee:** Service charge for platform (typically 10%)
- **Wakalah Percentage:** Fee percentage
- **Mudarabah Share:** Profit-sharing percentage from Halal investments
- **Coverage Amount:** Maximum protection provided
- **Investment Details:** Where Tabarru pool is invested (Shariah-compliant only)
- Benefits & features
- Shariah certification status

### Policy
- User enrollment in Takaful plans
- Auto-generated policy number (HT-YYYY-XXXXXX)
- Monthly contribution breakdown:
  - Total contribution
  - Tabarru amount (to mutual pool)
  - Wakalah fee (platform service)
  - Mudarabah share percentage
- Status tracking (pending, active, expired, cancelled)
- Beneficiary information
- Next payment date

### Claim
- Claim submissions from participants
- Auto-generated claim number (CLM-YYYY-XXXX)
- Amount requested (paid from Tabarru pool)
- Supporting documents
- Status: pending, approved, rejected, paid
- Admin approval workflow

### Payment
- Contribution payments tracking
- Auto-generated transaction ID (TXN-timestamp-XXXX)
- **Amount:** Total contribution
- **Tabarru Amount:** Amount going to mutual pool
- **Wakalah Fee:** Amount for platform service
- Payment method & status
- Period covered
- Links to policy

**Note:** All amounts are in Indian Rupees (₹)
- Auto-generated claim number
- Document attachments
- Admin processing

### Payment
- Payment transactions
- Auto-generated transaction ID
- Status tracking
- Period coverage

---

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Protected routes middleware
- ✅ Role-based access control
- ✅ Input validation using express-validator
- ✅ MongoDB injection prevention
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ Rate limiting ready
- ✅ Environment variable protection

---

## 🎨 Frontend Pages

1. **Landing Page**
   - Hero section with Muslim family imagery
   - **How Takaful Works:** 4-step visual explanation
     1. You Contribute (Tabarru)
     2. Pool Helps Members
     3. We Earn Ethically (Wakalah/Mudarabah/Operational)
     4. 100% Halal (No Riba, No Haram)
   - Features showcase
   - Customer testimonials
   - Call-to-action buttons

2. **Authentication**
   - Login page with JWT token handling
   - Signup page with validation

3. **Dashboard**
   - User profile card
   - Stats overview (coverage, monthly contribution in ₹)
   - Active policies with Tabarru/Wakalah breakdown
   - Recent claims status
   - Payment history

4. **Plans Page**
   - Search & filter Takaful plans
   - View plan details with:
     - Monthly contribution amount (₹)
     - Tabarru amount (90% to pool)
     - Wakalah fee (10% service charge)
     - Mudarabah profit-sharing percentage
     - Investment details (Shariah-compliant)
   - Enroll in plans

5. **Claims Page**
   - Submit new claims
   - Upload supporting documents
   - Track claim status
   - View claim history

---

## 💰 Takaful Revenue Model Implementation

### How Platform Earns (3 Halal Methods):

#### 1. Wakalah Fee (Service Charge)
- Fixed 10% of monthly contribution
- Stored in `plan.wakalahFee` and `payment.wakalahFee`
- Used for operational costs

#### 2. Mudarabah (Profit Sharing)
- Platform invests Tabarru pool in Halal avenues
- Profit split: e.g., 40% Platform, 60% Participants
- Stored in `plan.mudarabahShare`
- Investment details in `plan.investmentDetails`

#### 3. Operational Charges
- Transparent admin fees
- Disclosed upfront in terms

### Example Calculation:
```javascript
Monthly Contribution: ₹12,500
├── Tabarru (90%): ₹11,250 → Mutual Pool
└── Wakalah (10%): ₹1,250 → Platform Revenue

If Pool earns ₹1,00,000 profit from investments:
├── Platform (40% Mudarabah): ₹40,000
└── Participants (60%): ₹60,000 → Surplus distribution
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Validation
- **Helmet** - Security
- **CORS** - Cross-origin requests
- **Morgan** - Logging

---

## 📚 Documentation Files

- `backend/README.md` - Backend documentation
- `backend/API_TESTING.md` - API testing guide
- `backend/MONGODB_SETUP.md` - MongoDB setup instructions
- `backend/.env.example` - Environment variables template

---

## 🔄 Development Workflow

1. **Start MongoDB** (if local)
2. **Start Backend**: `cd backend && npm run dev`
3. **Start Frontend**: `npm run dev`
4. **Access App**: http://localhost:5173
5. **Access API**: http://localhost:5000/api

---

## 🧪 Testing

### Test API Health
```bash
curl http://localhost:5000/api/health
```

### Test Frontend
1. Open http://localhost:5173
2. Read "How Islamic Takaful Works" section on landing page
3. Click "Sign Up" to create account
4. Or use seeded credentials to login

### Test Takaful Flow
1. **Login** as user (ahmed@example.com / password123)
2. **Browse Plans** - See contribution breakdown (Tabarru + Wakalah)
3. **Enroll in Plan** - View Mudarabah profit-sharing details
4. **Make Payment** - Contribution split into Tabarru pool and service fee
5. **Submit Claim** - Request assistance from mutual pool
6. **Track Status** - Admin approves, Tabarru pool pays

### Test Admin Features
1. Login as admin (admin@halaltakaful.com / admin123)
2. Create new Takaful plan with:
   - Monthly contribution
   - Tabarru percentage (usually 90%)
   - Wakalah fee (usually 10%)
   - Mudarabah share (30-40%)
   - Investment details (Shariah-compliant)
3. Approve/reject claims
4. View all policies and payments

---

## 📦 Environment Variables

Create `backend/.env`:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/halaltakaful
JWT_ACCESS_SECRET=your_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

---

## 🚨 Troubleshooting

### Backend won't start
- ✅ Check MongoDB is running
- ✅ Verify .env file exists
- ✅ Check port 5000 is available

### Frontend API errors
- ✅ Ensure backend is running on port 5000
- ✅ Check CORS settings
- ✅ Verify API URL in `src/utils/api.js`

### MongoDB connection error
- ✅ Start MongoDB service
- ✅ Or use MongoDB Atlas
- ✅ Check connection string in .env

---

## 📈 Next Steps

### For Production:
1. **Security**:
   - Change JWT secrets to strong random strings
   - Enable rate limiting
   - Setup HTTPS
   - Implement file upload validation

2. **Features**:
   - Email notifications
   - PDF policy generation
   - Payment gateway integration
   - Admin dashboard
   - Real-time notifications

3. **Deployment**:
   - Frontend: Vercel, Netlify
   - Backend: Railway, Render, Heroku
   - Database: MongoDB Atlas

4. **Testing**:
   - Unit tests (Jest)
   - Integration tests
   - E2E tests (Cypress)

---

## 📞 Support

For issues or questions:
1. Check documentation in `backend/` folder
2. Review API examples in `API_TESTING.md`
3. Check MongoDB connection in `MONGODB_SETUP.md`

---

## 📄 License

ISC

---

## 🎯 Project Status

✅ **Complete and ready to use!**

Both frontend and backend are fully implemented with:
- User authentication
- Plan management
- Policy enrollment
- Claims processing
- Payment handling
- Admin features
- Responsive UI
- API integration ready

**Start developing now!** 🚀
