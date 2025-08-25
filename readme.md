# 📚 Library Management API

A robust **RESTful API** for managing a complete digital library system, built with **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## 🚀 Live Resources

- 📦 GitHub Repository: [Library Management API]()  
- 🌐 Deployed API: [Live API on Vercel]()

---

## 📖 Project Overview

The **Library Management API** provides all essential operations for a modern library system.  
It includes book catalog management, borrowing with business rules, and insightful borrow summaries using **MongoDB Aggregation**.

Core capabilities include:

- ✅ **Book Management (CRUD)**  
- ✅ **Borrowing with Quantity Validation**  
- ✅ **Borrow Summary Reports**  
- ✅ **Schema Validation with Mongoose**  
- ✅ **Static Methods & Middleware for Availability Tracking**  
- ✅ **Error Handling with Consistent Responses**  

---

## 🛠️ Tech Stack

- **Node.js**  
- **Express.js**  
- **TypeScript**  
- **MongoDB** with **Mongoose**  
- **Postman** (for API testing)  

---

## 📂 Project Structure

```bash
src/
│── app.ts                 # Express app entry
│── server.ts              # Server & MongoDB connection
│── config.ts              # Environment configuration
│
├── app/
│   ├── models/
│   │   ├── book.model.ts   # Book schema & static methods
│   │   └── borrow.model.ts # Borrow schema
│   │
│   ├── controllers/
│   │   ├── book.controller.ts   # Book API logic
│   │   └── borrow.controller.ts # Borrow API logic
│   │
│   ├── interfaces/
│   │   ├── book.interface.ts   # Book type definitions
│   │   └── borrow.interface.ts # Borrow type definitions
