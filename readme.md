# Task

1. After registration, the user can log in only after confirming their email.

- add sendEmail.js
- add to userModel.js fields `verify` (whether user confirmed their email) and `verificationCode` (code for verification the user)
- add to registration controller code for verification
- send email to user for confirmation (used sendEmail.js) by link (GET request) `http://localhost:3000/api/auth/verify/${verificationCode}`

2. The SendGrid email service is used.

# Options

## For deployment to Render.com, add the following to package.json:

```js
  "engines": {
    "node": "20.11" // current version on my PC
  }
```

# Packages

## Server and HTTP-request processing

- `express` - A server creation package. A Node.js framework for building web applications and APIs. Provides tools for routing, request processing, and sending responses.
- `cors` - Enables support for CORS (Cross-Origin Resource Sharing), allowing the server to accept requests from different domains or ports.
- `logger` - Middleware for logging HTTP requests in Node.js.

## Database

- `mongoose`- An object-document mapper (ODM) for MongoDB. It provides a schema-based solution for modeling and interacting with data in JavaScript.

## Security and Authentication

- `bcrypt` – A library for password hashing. Used to securely store passwords by providing hashing and verification functions.
- `jsonwebtoken` – A package for working with JWT (JSON Web Token), a standard for transmitting data as tokens. Used for authentication and authorization, including creating and verifying tokens.

## Configuration

- `dotenv` – Allows you to store confidential data (e.g., API keys, passwords) in an .env file and load them into environment variables.
- `cross-env` – Enables setting environment variables in a cross-platform manner, compatible with Windows, Linux, and macOS, via the console.

## Tools

- `nodemon` - A tool for automatically restarting Node.js applications when changes are made during development. Removes the need for manual restarts.

## Data validation

`joi` – A library for describing data schemas and validating data against those schemas. Useful for validating request bodies, parameters, and other input data.
`mongoose-validator` – A package for integrating validation library with Mongoose. Allowing you to validate field values in MongoDB schemas.
`validator` – A library for validating and normalizing strings. Includes methods for validating emails, URLs, numbers, UUIDs, IP-addresses, and more.
[`jest`](https://jestjs.io/) – The program test for js. A JavaScript testing framework.
For ES5 projects enough: `npm i --save-dev jest`.
For ES6 projects must be add: `npm i --save-dev @jest/globals`.
[`supertest`](https://www.npmjs.com/package/supertest) – A library for simulating HTTP-requests for testing purposes (`npm install supertest --save-dev`).

## Logging

- `morgan` - Middleware for logging HTTP requests. Useful for tracking incoming requests and server responses.

## Other tools

- `nanoid` - A generator for unique, short identifiers. Often used for creating user IDs or tokens.

## Send email services

- `nodemailer` - A library for sending emails using client-defined email services
- `@sendgrid/mail` - A package for sending emails through the SendGrid email service.

## Work with media files

- `multer` - Allows upload files together with fields. Middleware for processing multipart/form-data. Primarily used for uploading files to the server (e.g., images or documents).
- [`gravatar`](https://www.npmjs.com/package/gravatar) - A package for integrating the Gravatar service, which provides globally recognized avatars. Allows fetching user avatars based on email addresses.
