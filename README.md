# Notes.js

## Description
This project is a Node.js application that uses Express.js for the backend. It includes user authentication using JWT, password hashing with bcrypt, and CORS configuration. The project is structured to keep the code organized and maintainable.

## Features
- User Signup
- JWT Authentication
- Password Hashing
- CORS Configuration
- Sequelize ORM for database interaction

## Prerequisites
- Node.js
- npm
- MySQL

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/ahmadshah2103/Notes.js/pull/2
    cd Notes.js
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file as the `.env.example` file in the root directory and add your environment variables:

4. Run the application:
    ```sh
    npm start
    ```

## Project Structure
```
.
├── README.md
├── app.js
├── package-lock.json
├── package.json
├── src
│   ├── configs
│   │   ├── config.js
│   │   ├── constants.js
│   │   └── database.js
│   ├── controllers
│   │   ├── noteControllers.js
│   │   └── userControllers.js
│   ├── enums
│   │   └── userEnums.js
│   ├── index.js
│   ├── middlewares
│   │   ├── authenticate.js
│   │   ├── handleErrors.js
│   │   ├── validateAuthentication.js
│   │   └── validateNotes.js
│   ├── migrations
│   ├── models
│   │   ├── index.js
│   │   ├── note.js
│   │   └── user.js
│   ├── routes
│   │   ├── noteRoutes.js
│   │   └── userRoutes.js
│   ├── services
│   └── utils
│       ├── createOrUpdateUser.js
│       ├── generateUsername.js
│       ├── jwt.js
│       └── passwordHashing.js
├── template.js
└── test
    ├── integration
    └── unit

```

## Dependencies
- express
- cors
- dotenv
- jsonwebtoken
- bcrypt
- sequelize
- mysql2
