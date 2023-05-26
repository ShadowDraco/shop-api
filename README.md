# LAB - Class 09

## Project: Shop API

### Author: Ethan Storm Hayden Cooper

### Problem Domain

### Phase 1

implement a fully functional, authenticated and authorized API Server using the latest coding techniques.

### Phase 2

Create a shopping api and 'serve' it with inquirer in the terminal with protected and unprotected routes.

### Links and Resources

[Github Actions](https://github.com/ShadowDraco/shop-api-withAuth/actions)
[Backend deployment](https://frolic-shop-api.onrender.com)

### Collaboration

Api written with Hayden Cooper

#### `.env` requirements

Port variable (PORT)
Postgres connection url (DATABASE_URL)
Secret (SECRET)
API_URL (deployed server url)

#### How to set up the application

make sure to have pgsql installed and ready to use
clone repo, fill out env file `npm i`, then run `nodemon index.js` in the terminal
try the shopping with `npm run shop`!!

#### Routes

- Get: `/test` or `/` - to test
- Post: `/signup`, `/signin`
- Get, Post, Update, Delete: `/api/<v1/v2>/:model/:id`

#### Tests

to run tests, after `npm i`, run `npm test`
