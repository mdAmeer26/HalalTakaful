# HalalTakaful Backend API

Complete REST API for **Islamic Takaful Platform** built with Node.js, Express, and MongoDB.

## 🕌 What is Takaful?

**Takaful** is an Islamic alternative to conventional insurance based on mutual cooperation and Shariah compliance. Unlike insurance premiums, participants make **Tabarru (donations)** to a shared pool that helps members in need.

**Key Features:**
- ✅ No Interest (Riba)
- ✅ No Haram Investments
- ✅ Transparent Contribution Breakdown (Tabarru + Wakalah Fee)
- ✅ Ethical Revenue Models (Wakalah, Mudarabah, Operational Charges)

📖 **[Read Complete Takaful Model Explanation](../TAKAFUL_MODEL.md)**

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install dependencies**
```bash
cd backend
npm install
```

2. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/halaltakaful
JWT_ACCESS_SECRET=your_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
```

3. **Start the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User management
│   ├── planController.js    # Takaful plans
│   ├── policyController.js  # Policy management
│   ├── claimController.js   # Claims processing
│   └── paymentController.js # Payment handling
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── validation.js        # Input validation
├── models/
│   ├── User.js              # User schema
│   ├── Plan.js              # Plan schema
│   ├── Policy.js            # Policy schema
│   ├── Claim.js             # Claim schema
│   └── Payment.js           # Payment schema
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── planRoutes.js
│   ├── policyRoutes.js
│   ├── claimRoutes.js
│   └── paymentRoutes.js
├── .env.example
├── .gitignore
├── package.json
└── server.js                # Entry point
```

## 🔐 API Endpoints

### Authentication
```
POST   /api/auth/register      Register new user
POST   /api/auth/login         Login user
POST   /api/auth/refresh       Refresh access token
POST   /api/auth/logout        Logout user (Protected)
GET    /api/auth/me            Get current user (Protected)
```

### Users
```
GET    /api/users/profile      Get user profile (Protected)
PUT    /api/users/profile      Update profile (Protected)
GET    /api/users              Get all users (Admin)
GET    /api/users/:id          Get user by ID (Admin)
PUT    /api/users/:id          Update user (Admin)
DELETE /api/users/:id          Delete user (Admin)
```

### Plans
```
GET    /api/plans              Get all plans (Public)
GET    /api/plans/:id          Get plan by ID (Public)
POST   /api/plans              Create plan (Admin)
PUT    /api/plans/:id          Update plan (Admin)
DELETE /api/plans/:id          Delete plan (Admin)
```

### Policies
```
GET    /api/policies           Get user policies (Protected)
GET    /api/policies/active    Get active policies (Protected)
POST   /api/policies/enroll    Enroll in plan (Protected)
GET    /api/policies/:id       Get policy by ID (Protected)
PUT    /api/policies/:id       Update policy (Admin)
DELETE /api/policies/:id       Cancel policy (Protected)
```

### Claims
```
GET    /api/claims             Get user claims (Protected)
GET    /api/claims/all         Get all claims (Admin)
POST   /api/claims             Submit claim (Protected)
GET    /api/claims/:id         Get claim by ID (Protected)
PUT    /api/claims/:id/status  Update claim status (Admin)
DELETE /api/claims/:id         Delete claim (Admin)
```

### Payments
```
GET    /api/payments           Get user payments (Protected)
GET    /api/payments/all       Get all payments (Admin)
GET    /api/payments/stats     Get payment statistics (Admin)
POST   /api/payments           Create payment (Protected)
GET    /api/payments/:id       Get payment by ID (Protected)
PUT    /api/payments/:id/complete  Mark payment complete (Protected)
```

## 🔑 Authentication

The API uses JWT (JSON Web Tokens) with access and refresh tokens:

- **Access Token**: Short-lived (15 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used to get new access tokens

### Usage
1. Register or login to get tokens
2. Include access token in requests:
   ```
   Authorization: Bearer <access_token>
   ```
3. When access token expires, use refresh token to get new one

## 📝 Example Requests

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Ahmed Hassan",
  "email": "ahmed@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

### Create Plan (Admin)
```bash
POST /api/plans
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Health Takaful Premium",
  "description": "Comprehensive health coverage",
  "type": "health",
  "monthlyContribution": 150,
  "coverage": 500000,
  "benefits": ["Hospitalization", "Outpatient", "Medications"],
  "shariahCertified": true
}
```

### Enroll in Plan
```bash
POST /api/policies/enroll
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "planId": "654abc123def456ghi789jkl",
  "startDate": "2024-01-01",
  "beneficiaries": [
    {
      "name": "Fatima Hassan",
      "relationship": "Spouse",
      "percentage": 100
    }
  ]
}
```

### Submit Claim
```bash
POST /api/claims
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "policyId": "654abc123def456ghi789jkl",
  "type": "health",
  "description": "Hospital admission for surgery",
  "amount": 15000,
  "incidentDate": "2024-11-15"
}
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- MongoDB injection prevention
- CORS protection
- Helmet.js security headers
- Rate limiting
- Environment variable protection

## 🗄️ Database Models

### User
- name, email, password (hashed)
- role (user/admin)
- phone, isActive
- timestamps

### Plan
- name, description, type
- monthlyContribution, coverage
- benefits[], features[]
- shariahCertified, isActive

### Policy
- policyNumber (auto-generated)
- user, plan references
- status, dates, coverage
- beneficiaries[]

### Claim
- claimNumber (auto-generated)
- user, policy references
- type, description, amount
- status, documents[]
- admin processing info

### Payment
- transactionId (auto-generated)
- user, policy references
- amount, paymentMethod
- status, periodCovered

## 🛠️ Admin Functions

Create first admin user directly in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@halaltakaful.com" },
  { $set: { role: "admin" } }
)
```

## 📊 Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 🧪 Testing

Test API health:
```bash
GET http://localhost:5000/api/health
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - CORS middleware
- **helmet** - Security headers
- **express-validator** - Input validation
- **morgan** - HTTP logger

## 🔄 Environment Variables

See `.env.example` for all required variables.

## 📄 License

ISC
