# Kambaz Node Server App

This is the **backend service** for the [Kambaz React Web App](https://github.com/nharikrishna/kambaz-react-web-app), a clone of the Canvas LMS. It provides RESTful APIs for managing users, courses, assignments, and more. Built with Node.js, Express, and MongoDB.

---

## Features

- **User Authentication & Authorization** (JWT-based)
- **Course & Assignment Management APIs**
- **Role Support**: Instructors and Students
- **MongoDB Integration** with Mongoose ORM
- **CORS & Middleware Support** for frontend-backend integration

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose

---

## Frontend Repo

Check out the React frontend that consumes this backend:  
**[kambaz-react-web-app](https://github.com/nharikrishna/kambaz-react-web-app)**


---

## API Endpoints (Sample)

- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Authenticate and get token  
- `GET /api/courses` – List all courses  
- `POST /api/assignments` – Create a new assignment

---
