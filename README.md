# Library Management System API

This is a backend API for managing library operations, including managing books, borrowers, and the borrowing process.

![Entity Relationship Diagram](https://i.imgur.com/nOXtxyB.jpeg)

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Postman Collection](#postman-collection)

## Features

### Functional Requirements
1. **Books:**
   - Add a book with details like title, author, ISBN, available quantity, and shelf location.
   - Update a book’s details.
   - Delete a book.
   - List all books.
   - Search for a book by title, author, or ISBN.

2. **Borrowers:**
   - Register a borrower with details like name, email, and registered date (keep user details as simple as possible).
   - Update a borrower’s details.
   - Delete a borrower.
   - List all borrowers.

3. **Borrowing Process:**
   - A borrower can check out a book. The system keeps track of which books are checked out and by whom.
   - A borrower can return a book.
   - A borrower can check the books they currently have.
   - The system tracks due dates for the books and lists books that are overdue.

### Non-functional Requirements
1. **Performance**: The system is optimized for reading operations since searching and listing books/borrowers will be frequent operations.
2. **Scalability**: The system design supports the addition of new features in the future, like reservations or reviews.
3. **Security**: Ensure that user inputs are validated to prevent SQL injection or other potential security threats.

## Technologies
- Node.js
- Express.js
- Sequelize (for ORM)
- MySQL

## Installation
To get started with the project, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```
2. Create .env file like .env.example with your relevant configuration.
3. Install the required dependencies:
```bash
npm install
```
4. Create the database and run migrations in one command:
```bash
npx sequelize db:create
```
5. Run migrations:
```bash
npx sequelize db:migrate
```

## Usage
To start the API server, run:
```bash
npm run start
```
## Postman Collection
View API endpoints using the following Postman collection: [Library Management System Postman Collection](https://www.postman.com/omarahmedl/library-management/overview).





