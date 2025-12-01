# MongoDB Setup Guide

The backend requires MongoDB to be running. You have two options:

## Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create free account**: https://www.mongodb.com/cloud/atlas/register

2. **Create a cluster**:
   - Choose FREE tier (M0)
   - Select a cloud provider and region
   - Click "Create Cluster"

3. **Setup database access**:
   - Go to "Database Access"
   - Add new user with username and password
   - Save credentials

4. **Setup network access**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0) for development

5. **Get connection string**:
   - Go to "Databases" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

6. **Update backend/.env**:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/halaltakaful?retryWrites=true&w=majority
```

## Option 2: Local MongoDB Installation

### Windows:
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. MongoDB runs as a service automatically
4. Default connection: `mongodb://localhost:27017/halaltakaful`

### macOS (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu):
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

## After Setup

1. Update `backend/.env` with your MongoDB URI
2. Restart backend server: `npm run dev`
3. Seed database: `npm run seed`
4. Test API: http://localhost:5000/api/health

## Verify MongoDB is Running

**Local MongoDB**:
```bash
# Windows (PowerShell)
Get-Service MongoDB

# macOS/Linux
mongosh
```

**Atlas**: Check your cluster dashboard - it should show "Active"

## Troubleshooting

**Connection refused error**: MongoDB is not running
- Start local MongoDB service
- Or switch to MongoDB Atlas

**Authentication failed**: Check username/password in connection string

**Network timeout**: Check Network Access settings in Atlas
