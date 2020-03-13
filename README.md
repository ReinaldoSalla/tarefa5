## Usage: 

`cd server && npm run start:dev` 

`cd client && npm run watch` 

access http://localhost:3000

## Http methods: 

GET: localhost:3000/api/negotiations

POST: localhost:3000/api/negotiations

GET: localhost:3000/api/negotiations/id

PATCH: localhost:3000/api/negotiations/id

DELETE: localhost:3000/api/negotiations

DELETE: localhost:3000/api/negotiations/id

## Importing negotiations: 

`cd server/src/utils && npx ts-node populatedb.db` 

GET: localhost:3000/api/negotiations/thisWeek

GET: localhost:3000/api/negotiations/lastWeek

GET: localhost:3000/api/negotiations/beforeLastWeek

## Validations: 

POST, PATCH: date, amount, value

GET(id), PATCH(id), DELETE(id): id

## Todo:

docker

security

swagger

authentication and autorization