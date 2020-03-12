## Usage: 

`cd server && npm run start` 

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

16/2/1995 frontend

send error msgs to the browser, like it sends to postman

do something when some client sends anendpoint that does't exist

use only negotiationDto in the request body 

create a custom decorator to validate the date

validate the mongodb ids from the requests with a decorator validator

## Todo2:

security

docker

swagger

authentication and autorization
