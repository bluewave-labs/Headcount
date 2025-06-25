# 🛠️ Headcount Installation Guide

This document guides you through installing and running all branches of the Headcount HRM application.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** v16 or newer  
- **npm** (bundled with Node.js)  
- **PostgreSQL** v12 or newer   

---

## 1. Clone the repository

git clone https://github.com/bluewave-labs/Headcount.git
cd Headcount

By default you'll be on the main branch. To work on any other branch:
git fetch
git checkout <branch-name>

# 2. Install dependencies
Backend (Node.js API) and frontend (React web client) are separate:
npm install       # installs both backend and frontend dependencies via root package.json

# 3. Set up environment variables
Copy and customize:
cp .env.example .env
Edit .env to include valid database credentials, ports, and any secret keys.

# 4. Initialize the PostgreSQL database
Ensure your Postgres server is running:
# create the DB
createdb headcount_db

# run migrations
npm run migrate

# seed initial data (optional)
npm run seed
If migrations fail, verify your .env credentials and ensure headcount_db exists.

# 5. Start the application
You can run frontend and backend separately or concurrently.

Backend only (API running on port from .env, e.g., 5000):
npm run start:server

Frontend only (React app, typically port 3000):
npm run start:client

Both together:
npm run start

Once started, open your browser to http://localhost:3000

# 6. Branch-specific notes
Apply these when you've switched to non-main branches:

Feature branches: only migrate/seed when backend schema changed.

Frontend branches: ensure .env has correct REACT_APP_API_URL.

CI/CD branches: may include additional scripts—refer to branch README or pipeline definitions.
