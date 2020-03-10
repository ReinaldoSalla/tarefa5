cd server && npm run start:dev

cd client && npm run watch

STATIC CONTENT: localhost:3000 \
MESSAGE: localhost:3000/api \
POST: localhost:3000/api/negotiations  \
GET: localhost:3000/api/negotiations  \
GET: localhost:3000/api/negotiations/id \
GET: localhost:3000/api/negotiations/thisWeek \
GET: localhost:3000/api/negotiations/lastWeek  \
GET: localhost:3000/api/negotiations/beforeLastWeek  \
PATCH: localhost:3000/api/negotiations/id \
DELETE: localhost:3000/api/negotiations \
DELETE: localhost:3000/api/negotiations/id \
LOGS all methods \
VALIDATIONS post, patch (date, amount, value) \
VALIDATIONS get(id), patch(id), delete(id) id

