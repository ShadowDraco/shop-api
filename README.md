# LAB - Class 08

## Project: Auth API

### Author: Ethan Storm

### Problem Domain

#### Phase 1

Deploy an Express server that implements [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), with signup and sign-in capabilities, using a Postgres database for storage.

#### Phase 2

any user that has successfully logged in using basic authentication (username and password) is able to continuously authenticate … using a “token”

### Phase 3

implement a fully functional, authenticated and authorized API Server using the latest coding techniques.

![LAB 8 UML](assets/Lab8.png)

### Links and Resources

[Github Actions](https://github.com/ShadowDraco/auth-api/actions)
[Backend deployment](https://frolic-auth-api.onrender.com)

### Collaboration

This server was adapted from a code fellows lab starter code

#### `.env` requirements

Port variable (PORT)
Postgres connection url (DATABASE_URL)
Secret (SECRET)

#### How to set up the application

make sure to have pgsql installed and ready to use
clone repo, fill out env file `npm i`, then run `node app.js` in the terminal

#### Routes

- Get: `/test` or `/` - to test

#### Tests

to run tests, after `npm i`, run `npm test`

[LAB 8 PR #1](https://github.com/ShadowDraco/auth-api/pull/1)
