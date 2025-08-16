# Task-Manager
Task Manager Using REACT/NODE.JS

This is the frontend part of the **Task-Manager App** built with:
- React + TypeScript
- Tailwind CSS
- Axios for API calls
- React Router for routing

## 📦 Requirements
- Node.js >= 18
- npm or yarn or pnpm
- Backend API running (see backend README part below for details)

## Features
* User Registration – Create a new account.
* User Login – Authenticate and access protected pages.
* Protected Dashboard – Only accessible to logged-in users.
* View Tasks – Display list of all tasks from the API.
* Create Task – Add new tasks with title and description.
* Update Task – Edit task details or mark as completed.
* Delete Task – Remove tasks from the list.
* Task Completion Toggle – Checkbox to mark tasks done/undone (with line-through style).
* Dark/Light Theme Toggle – Available when logged in.
* Responsive UI – Mobile-friendly layout.

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager/FE/task-manager
```
### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Run the development server
```bash
npm run dev
# or
yarn dev
```
Open http://localhost:5173 in your browser.

### Project Structure
src/
  - components/     # Reusable UI components
  - context/        # Auth & Theme context
  - pages/          # Route pages (SignIn, SignUp, Dashboard)
  - API/       # Axios API service functions
App.tsx         # Main application component
main.tsx        # Entry point

---
# Task Manager API

A backend service for managing tasks, built with **Node.js**, **Express**, **MySQL**, and **Sequelize**, with **JWT authentication** and **Swagger documentation**.

## 📦 Features
- User **signup** & **signin** with password hashing
- JWT-based authentication
- CRUD operations for tasks (Create, Read, Update, Delete)
- Protected routes for authenticated users only
- Swagger API documentation
- Jest and Supertest for testing

## ⚙️ Tech Stack
- **Backend**: Node.js, Express
- **Database**: MySQL (Sequelize ORM)
- **Authentication**: JWT + bcryptjs
- **Validation**: Joi
- **Documentation**: Swagger (swagger-jsdoc + swagger-ui-express)
- **Unit & Integration Testing** – API endpoints tested using Jest and Supertest.

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
```
### 2. Install dependencies
```bash
npm install
# or
yarn install
```
### 3. Environment variables

Create a .env file in the root of the backend folder:
```
PORT=yourport
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DB=task_manager
JWT_SECRET=yourjwtsecret
SALT=yoursalt
```

### 4. Run database migrations / sync
Make sure your MySQL server is running, then:
```bash
npm run dev
```
The Sequelize sync will automatically create the necessary tables.

### 5. Run the development server
```bash
npm run dev
# or
yarn dev
```

### 6. We can test apis using jest:
```bash
npm test
```
<img width="346" height="258" alt="image" src="https://github.com/user-attachments/assets/d6c47f63-99aa-4f14-b5b2-28cee0bfe283" />


