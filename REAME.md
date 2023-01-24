# Chat application written in react js, redux, nodejs, mysql and prisma .

### LetsChat is an online messaging platform that allows you to connect and communicate with a diverse group of users who are available on the platform at any given time.

To get started, you need to have Node.js installed on your machine. If it's not, you can download and install it from [nodejs.org](https://nodejs.org).

## Get started with frontend (client)

- To run the frontend first install dependencies by running `npm install` in the **client** directory.
- To start the frontend run `npm run dev`.

## Get started with backend (server)

- To run the backend first install dependencies by running `npm install` in the **server** directory.
- To start the backend run `npm run server`.

## Environment variables setup

In order to fully setup backend, you need to add following environment variables to your .env file

### General env vars

- `JWT_SECRETE_TOKEN` is the jsonwebtoken secret.
- `DATABASE_URL` is the url to your database. For this project the database is mysql.

### Firebase config env vars

- `API_KEY `
- `AUTH_DOMAIN`
- `PROJECT_ID`
- `STORAGE_BUCKET`
- `MESSAGING_SENDER_ID`
- `APP_ID`
- `MEASUREMENT_ID`

To generate your own Firebase Cloud storage config variables follow this [article](https://javascript.plainenglish.io/uploading-an-image-to-firebase-cloud-storage-and-returning-url-with-express-nodejs-713daac7a5d4).

### Known issues (work in progress)

This project is still on going. Some features have not been implemented yet
