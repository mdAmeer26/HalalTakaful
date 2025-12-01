# HalalTakaful API Testing Guide

## Test with cURL or Postman

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed@example.com",
    "password": "password123"
  }'
```

Save the `accessToken` from response for authenticated requests.

### 4. Get All Plans (Public)
```bash
curl http://localhost:5000/api/plans
```

### 5. Get User Profile (Protected)
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 6. Enroll in Plan (Protected)
```bash
curl -X POST http://localhost:5000/api/policies/enroll \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "planId": "PLAN_ID_FROM_PLANS_LIST",
    "startDate": "2024-12-01"
  }'
```

### 7. Submit Claim (Protected)
```bash
curl -X POST http://localhost:5000/api/claims \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "policyId": "POLICY_ID",
    "type": "health",
    "description": "Medical treatment",
    "amount": 412500,
    "incidentDate": "2024-11-20"
  }'
```

### 8. Create Payment (Protected)
```bash
curl -X POST http://localhost:5000/api/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "policyId": "POLICY_ID",
    "amount": 12500,
    "paymentMethod": "credit_card"
  }'
```

### 9. Admin: Create Plan
```bash
curl -X POST http://localhost:5000/api/plans \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN" \
  -d '{
    "name": "Family Health Plan",
    "description": "Complete family coverage",
    "type": "health",
    "monthlyContribution": 20625,
    "coverage": 61875000,
    "benefits": ["Family coverage", "Dental", "Vision"],
    "shariahCertified": true
  }'
```

### 10. Admin: Approve Claim
```bash
curl -X PUT http://localhost:5000/api/claims/CLAIM_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN" \
  -d '{
    "status": "approved",
    "approvedAmount": 412500,
    "adminNotes": "Claim approved after verification"
  }'
```

## Testing Flow

1. **Seed Database**: `npm run seed` (in backend folder)
2. **Login as admin**: admin@halaltakaful.com / admin123
3. **Login as user**: ahmed@example.com / password123
4. **Get plans** → **Enroll in plan** → **Make payment** → **Submit claim**

## Expected Response Format

Success:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Postman Collection

Import these endpoints into Postman:
- Base URL: `http://localhost:5000/api`
- Set environment variable `accessToken` for authenticated requests
- Use `{{accessToken}}` in Authorization header
