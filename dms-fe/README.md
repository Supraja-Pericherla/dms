# 📄 Document Management System (DMS)

A full-stack **Document Management System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
This project allows users to upload, edit, delete, and manage documents efficiently in a clean, user-friendly interface.

---

## 🚀 Project Overview

The Document Management System helps users:

- Upload PDF, image, or document files.
- View all uploaded files in a list.
- Edit or delete documents.
- Search for documents easily.
- Manage and store data in MongoDB.

---

## ⚙️ COMPLETE PROJECT SETUP GUIDE

Follow these steps carefully to set up and run the project successfully.

---

```bash
# ===================================================
# STEP 1️⃣ - INSTALL REQUIRED SOFTWARE
# ===================================================
# Make sure you have the following installed:
# 1. Node.js (https://nodejs.org/)
# 2. npm (comes with Node.js)
# 3. MongoDB (https://www.mongodb.com/try/download/community)
# ===================================================


# ===================================================
# STEP 2️⃣ - DOWNLOAD THE PROJECT
# ===================================================
# Open your terminal or VS Code terminal and run

# Go into the project folder
cd Document-Management-System
# ===================================================


# ===================================================
# STEP 3️⃣ - BACKEND SETUP
# ===================================================

# Go into the backend folder
cd dms-be

# Install all backend dependencies
npm install

# Create a new file named ".env" inside the dms-be folder
# Then add the following lines to it (very important):

# ---------- .env file content ----------
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/dms
# --------------------------------------

# Start MongoDB (if it's not already running)
# In another terminal window, run:
mongod

# Now run the backend server
npm start

# ✅ If everything works, you should see:
# "Server running on port 5000"
# "Connected to MongoDB successfully"

# Keep this terminal running — don’t close it.
# ===================================================


# ===================================================
# STEP 4️⃣ - FRONTEND SETUP
# ===================================================

# Open a NEW terminal window or tab (don’t stop the backend).
# Go into the frontend folder:
cd dms-fe

# Install all frontend dependencies
npm install

# Run the frontend app
npm start

# ✅ The frontend app will automatically open at:
# http://localhost:3000

# This React app connects to your backend running on:
# http://localhost:5000
# ===================================================


# ===================================================
# STEP 5️⃣ - TEST THE FULL APPLICATION
# ===================================================

# Now that both frontend and backend are running:

# 🖥️ Frontend (React) URL:
http://localhost:3000

# ⚙️ Backend (Node/Express) URL:
http://localhost:5000

# 🗄️ MongoDB default connection:
mongodb://127.0.0.1:27017/dms

# Try uploading a document, viewing it in the list,
# editing details, and deleting if needed.
# ===================================================


# ===================================================
# STEP 6️⃣ - COMMON ISSUES & FIXES
# ===================================================

# ❌ MongoDB connection error:
# ✅ Make sure MongoDB service is running using:
mongod

# ❌ Port already in use error:
# ✅ Stop the running process or change the port in the .env file:
PORT=5001

# ❌ CORS error:
# ✅ Add this to your backend server.js file if missing:
const cors = require("cors");
app.use(cors());
# ===================================================


# ===================================================
# STEP 7️⃣ - QUICK COMMANDS SUMMARY
# ===================================================

# ---------- Run Backend ----------
cd dms-be
npm install
node index.js

# ---------- Run Frontend ----------
cd dms-fe
npm install
npm start
# ===================================================
```
