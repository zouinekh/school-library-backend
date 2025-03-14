# School Library Management System - Backend

A Node.js backend application for managing a school library, including book inventory and checkout management.

## Features

- **Book Management**
  - Add, update, and delete books
  - Search books by title or author
  - Track available copies

- **Checkout System**
  - Check out books to students
  - Return books
  - View checkout history by book

- **Dashboard**
  - View library statistics
  - Track total books, available books, total checkouts, and active checkouts

- **API Rate Limiting**
  - Prevents abuse of the API

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling

## Project Structure
```plainText
school-library-backend/
├── src/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── utils/          # Utility functions
├── .env                # Environment variables (not in repo)
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies
└── server.js           # Application entry point
```

## Getting Started

### Prerequisites

- Node.js installed
- Node version used v20.18.1

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd school-library-backend
```
2. Install dependencies
```bash
   npm install
   ```
3. Set up environment variables
   - Create a .env file in the root directory
   - paste in the env information provided in the mail
### Running the Application
1. Start the server in development mode:
```bash
npm run dev
```
2. Seed the database with simple data:
   ```bash
   npm run seed
   ```
## API Endpoints
### Books
- `GET /books` - Get all books (with pagination and search)
- `GET /books/:id` - Get a specific book by ID
- `PUT /books` - Add a new book
- `PATCH /books/:id` - Update a book
- `DELETE /books/:id`- Delete a book
### Checkouts
- `GET /checkouts` - Get all checkouts (with pagination and search)
- `PUT /checkouts` - Create a new checkout
- `PATCH /checkouts/:id` - Return a book
- `GET /checkouts/book/:bookId` - Get checkouts for a specific book
### Dashboard
- `GET /dashboard` - Get library statistics