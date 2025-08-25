# 📚 Library Management API

A robust **RESTful API** for managing a complete digital library system, built with **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## 🚀 Live Resources

- 📦 GitHub Repository: `https://github.com/ashikurriyal/Library-Management-API`
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

```
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

````

## 📁 Core Features 

The **Library Management API** is packed with well-thought-out features designed to ensure a seamless and reliable system for managing books and borrowing activity. Below is a breakdown of its core functionalities:

---

### ✅ Add, Update, Delete, and Retrieve Books

Perform full **CRUD operations** on book records. Each book includes:

* Title, author, genre, and description
* ISBN for unique identification
* Number of total copies
* Availability status (automatically managed)

This enables efficient and flexible library inventory management.

---

### ✅ Borrow Books with Quantity Validation & Availability Tracking

Users can borrow books only if enough copies are available:

* The system validates requested quantity.
* Automatically reduces available copies.
* If no copies remain, the book is marked as unavailable using a **custom static method**.

Ensures real-time stock management and prevents over-borrowing.

---

### ✅ Aggregated Borrow Data Using MongoDB Pipelines

Leverages **MongoDB Aggregation Framework** to:

* Group borrow records by book
* Calculate total quantities borrowed
* Provide quick insights into borrowing trends or popular books

Useful for reporting, analytics, and decision-making.

---

### ✅ Schema Validation Using Mongoose

Enforces strict data validation rules:

* Prevents invalid or missing data
* Custom error messages for each field
* Enhances database integrity and robustness

Ensures that all incoming data conforms to expected structure and logic.

---

### ✅ Custom Static Methods for Book Availability Control

Implements **static methods** on the Mongoose model to:

* Update `available` status based on remaining copies
* Centralize availability logic for better maintainability

This encapsulation reduces repetition and improves code clarity.

---

### ✅ Middleware (`post` hooks) to Update Availability

Uses **Mongoose middleware hooks** like `post('findOneAndUpdate')` to:

* Automatically recheck and update a book’s availability after updates
* Keep system state consistent without requiring manual logic in controllers

Adds reactivity to data changes and improves system automation.

---

### ✅ Filter, Sort, and Paginate Book Lists

Supports query parameters for:

* Filtering by genre or other fields
* Sorting results (e.g., by title, creation date)
* Paginating large result sets with `limit`

This allows frontend clients to build fast, responsive, and user-friendly interfaces.

---

### ✅ Centralized and Consistent Error Format

All error responses follow a standardized JSON structure:

```
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}

```

## 🎥 Demo Video
https://drive.google.com/drive/folders/1JepM-ysInsP26_YMR75lAfnyHYAJSDGR?usp=drive_link

---

## 👨‍💻 Author
Molla Ashikur Rahman
riyalashikur@gmail.com
---