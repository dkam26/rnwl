# rnwl
Technical exercise v1.0

# Manage Pet Insurance
REST API to allow users to manage their pet
insurances.

## About
A user can add pets

A user can delete pets

A user can update pets

A user can view pet(s)

A user can add claims of a pet

A user can update claims of a pet

A user can delete claims of a pet

A user can view claims of a given pet

A user is required to include an e-mail address and password


## Tools
Tools used for development of this API are;
- API development environment: [Postman](https://www.getpostman.com)
- Editor: [Vs code](https://code.visualstudio.com)
- Database: [Postgresql](https://www.mysql.com/)
- Framework: [Express](https://expressjs.com/)
- Programming language: [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Tests


To run the tests,use:

docker-compose build

docker-compose up -d

npm test



## Getting Started


## End points
### Endpoints to create a user account and login into the application
HTTP Method|End point | Public Access|Action
-----------|----------|--------------|------
POST | /user/signup/ | True | Create an account
POST | /user/login/ | True | Login a user



### Endpoints to add, update, view and delete a pet(s)
HTTP Method|End point | Public Access|Action
-----------|----------|--------------|------
POST | /api/pet | False | Add a pet
GET | /api/pet| False | View all pets
GET | /api/pet/:id| False | View a pet by id
PUT | /api/pet/:id| False | Update a pet
DELETE | /api/pet/:id| False | delete a pet


### Endpoints to add, update, view and delete a claim(s)
HTTP Method|End point | Public Access|Action
-----------|----------|--------------|------
POST | /api/claim | False | Add a claim
GET | /api/claim| False | View all claims
GET | /api/claim/:id| False | View a claim by id
PUT | /api/claim/:id| False | Update a claim
DELETE | /api/claim/:id| False | delete a claim



## Contributors

https//github.com/dkam26



