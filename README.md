# React Native Todo App with Mock Authentication API

---

## Project Overview

This project is a React Native application that includes:

- User Registration (Sign Up)
- User Login (Sign In)
- Todo CRUD functionality (Create, Read, Update, Delete)
- Local state management for Todos
- Local session persistence using AsyncStorage
- Mock backend API using MockAPI.io (Authentication only)

---

## Technologies Used

- React Native (Expo)
- TypeScript
- React Native Paper
- Redux Toolkit / RTK Query
- @react-native-async-storage/async-storage
- MockAPI.io

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/mohitbhandari6112/todoAuth
cd your-repo-name
```

### Install Dependencies

```bash
npm install
```

### Run Application

```bash
npx expo start
```

---

## API Configuration (Authentication Only)

### Base URL

```
https://697f20ead1548030ab653955.mockapi.io
```

---

## User Model

Only user records are stored in MockAPI.  
All authentication logic is handled on the frontend after fetching users.

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "johndoe@test.com",
  "password": "123456"
}
```

---

## Authentication Endpoints

### Get All Users

```http
GET /users
```

All users are fetched first, and email/password validation is handled on the frontend.

---

### Register User

```http
POST /users
```

Request Body:

```json
{
  "name": "John Doe",
  "email": "johndoe@test.com",
  "password": "123456"
}
```

---

## Todo Implementation

- Todos are managed using React local state (`useState`)
- Todo data is persisted locally using AsyncStorage
- No backend API is used for Todo CRUD operations

---

## Assumptions

- Password validation is handled on the frontend.
- No JWT or token-based authentication is implemented.
- No password hashing is used (passwords are stored in plain text).
- User API responses include the password field.
- Todos are managed locally using React state.
- Project is intended for development and demonstration purposes only.

---

## Author

Mohit Bhandari
