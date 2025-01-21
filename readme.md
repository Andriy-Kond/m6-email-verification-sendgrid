# Task

- After registration the user can login after he confirm email only.
- Used sendgrid email service.

# Options

## For render to render.com needs add to package.json:

```js
  "engines": {
    "node": "20.11" // current version on my PC
  }
```

# Packages

## Server and HTTP-requests processing

- `express` - create server package. Node.js framework for build web-applications and API. Gave instruments for routing, processing requests and response.
- `cors` - allows setup support CORS (Cross-Origin Resource Sharing), for server accepting requests from other domains or ports.
- `logger` - brocker for logging HTTP-requests for Node.js

## Database

- `mongoose`- an object-document module for MongoDB. Provides a schema for data modeling and data interaction via JavaScrip.

## Secure and authentication

- `bcrypt` - Password hashing library. Used to store passwords in a secure format. Provides hashing and hash verification functions.
- `jsonwebtoken` - package for work with JWT (JSON Web Token) - a standard for transmitting data as token. Used for authentication and authorization, in particular, for creating and verifying tokens.

## Configuration

- `dotenv` - allows save confidential data (such as API keys, passwords) in an .env file and load them to environment variables
- `cross-env` - provides the ability to set environment variables for cross-platform environments, such as Windows, Linux or MacOS via the console.

## Tools

- `nodemon` - tool for automatic restarting Node.js-applications after code changes during development. Eliminates the need manually restart the server.

## Data validation

- `joi` - package for schemas describing and validating data against those schemas. Used for validating request body, arguments and other data.
- `mongoose-validator` - package for integration a validation library with Mongoose, allowing you to validate field values in MongoDB schemas.
- `validator` - Package for verifying and normalizing strings. Includes methods for verifying email, URL, numbers, UUID, IP-addresses and also for validation.
- [`jest`](https://jestjs.io/) - program test for js
  for ES5 project enough: `npm i --save-dev jest`
  for ES6 must be add: `npm i --save-dev @jest/globals`
- [`supertest`](https://www.npmjs.com/package/supertest) - Imitates HTTP-request (`npm install supertest --save-dev`)

## Logging

- `morgan` - Middleware for HTTP requests logging. Used for track incoming requests and server responses.

## Other tools

- `nanoid` - generator of uniq short keys. Used for example for creating user IDs or tokens.

## Send email services

- `nodemailer` - send emails, using client mail service
- `@sendgrid/mail` - send email by sendgrid broker service

## Work with media files

- `multer` - Allows upload files together with fields. The middleware for processing multipart/form-data. Used for load files to server (for example images or documents).
- [`gravatar`](https://www.npmjs.com/package/gravatar) - Package for integration the Gravatar - global avatar service. Allows you to receive users avatars by their emails.
