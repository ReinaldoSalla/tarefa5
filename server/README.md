old version \
localhost:3000 = client \
localhost:3000/api = simple message \
localhost:3000/api/negotiations = POST method for one negotiation \
localhost:3000/api/negotiations = GET method for all negotiations \
localhost:3000/api/negotiations/id = GET method for one negotiation \
localhost:3000/api/negotiations/id = PATCH method for one negotiation \
localhost:3000/api/negotiations/id = DELETE method for one negotiation \

new version \
localhost:3000 = client \
localhost:3000/api = simple message \
localhost/3000/api/negotiations/thisWeek = GET method for fetching the negotiations from this week \
localhost/3000/api/negotiations/lastWeek = GET method for fetching the negotiations from last week \
localhost/3000/api/negotiations/beforeLastWeek = GET method for fetching the negotiations from before last week 
