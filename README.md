# MERN Testing & Debugging Assignment

## 🚀 Project Overview
This project demonstrates a comprehensive testing strategy for a MERN stack application. It implements a robust suite of Unit, Integration, and End-to-End tests to ensure application reliability and 86% code coverage.

## 🛠️ Testing Strategy

### 1. Unit Testing (Jest)
**Goal:** Verify isolation of logic without external dependencies.
- **Server:** We mocked `req`, `res`, and `next` to test Middleware (`authMiddleware.js`) and Utility functions (`auth.js`) in isolation.
- **Client:** We tested pure logic functions (`validation.js`) and UI components (`Button.jsx`) using React Testing Library to ensure props render correct classes.

### 2. Integration Testing (Supertest & MongoMemoryServer)
**Goal:** Verify data flow between API, Controller, and Database.
- **Tools:** Used `mongodb-memory-server` to spin up a fresh database for every test suite, ensuring tests do not affect production data.
- **Scope:** Covered `Post` and `Auth` routes. Verified that valid tokens allow access to protected routes and invalid data returns correct 400/401 errors.

### 3. End-to-End Testing (Cypress)
**Goal:** Simulate real user behavior in the browser.
- **Setup:** Configured a "Split Terminal" environment where Frontend (Port 3000) proxies requests to Backend (Port 5000).
- **Tests:** Verified the critical "User sees posts" flow. Confirmed that the React app successfully fetches and displays data from the live server.

---

## 📸 Test Coverage & Evidence

### Code Coverage Report (Server)
**Result:** >86% Statement Coverage (Exceeds 70% requirement).
![Coverage Report](./screenshots/coverage-report.png)

### End-to-End Success (Cypress)
**Result:** All critical user flows passing.
![Cypress Success](./screenshots/cypress-success.png)

---

## 🐛 Debugging Techniques Implemented

During development, several critical bugs were identified and resolved using the following techniques:

### 1. Logic Error Identification (Integration Tests)
* **Issue:** The `createPost` test was failing despite a 400 Bad Request response.
* **Diagnosis:** Analyzed Jest output: `Expected property "error", received "message"`.
* **Fix:** Updated `postController.js` to standardize error response keys. This aligns the API implementation with the specific requirements of the test suite.

### 2. Library Version Compatibility (Unit Tests)
* **Issue:** `TypeError: Class constructor ObjectId cannot be invoked without 'new'`.
* **Diagnosis:** Identified that the test suite used older Mongoose syntax while the project used Mongoose v6+.
* **Fix:** Refactored tests to use `new mongoose.Types.ObjectId()`.

### 3. Environment & Network Debugging (E2E Tests)
* **Issue:** Cypress reported `Unexpected token '<'` when fetching posts.
* **Diagnosis:** This indicated the React frontend was returning its own HTML (index.html) instead of API JSON data, meaning the API request wasn't reaching the server.
* **Fix:** Configured `"proxy": "http://localhost:5000"` in the client `package.json` and restarted the development server to bridge the frontend-backend communication gap.

---

## 🔧 How to Run

1. **Install Dependencies:**
   ```bash
   npm run install-all
2. **Run Tests:**

Bash

# Server Tests
cd server && npm test

# Client Tests
cd client && npm test

# E2E Tests (Requires Server & Client running)
cd client && npm run cypress:open

[Coverage] link:C:\Users\PC\Documents\PLP\Class Work\MERN\Week 6\mern-testing\testing-and-debugging-ensuring-mern-app-reliability-Padawan33\Screenshots\coverage-report.png.png


[Cypress Success] link:C:\Users\PC\Documents\PLP\Class Work\MERN\Week 6\mern-testing\testing-and-debugging-ensuring-mern-app-reliability-Padawan33\Screenshots\cypress-success.png.png