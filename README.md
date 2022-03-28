# Getting Started

This project is intended to run in a docker environment, so `docker` and `docker-compose` will need to be installed. The API can be run outside of docker but it will not be covered in this readme. For addtional information about `docker-compose` please see the online documentation `https://docs.docker.com/compose/`.

Open the project in terminal. Enter the command `docker-compose up -d`

Docker will startup 1 service.
1. A NodeJS service which will run on port `3001`

This port will need to be available.

To open the app on the host machine enter `http://localhost:3001` in a browser.

2 endpoints have been made available. `:id` is the route_id found in the alert API.
1. `/status/:id`
2. `/uptime/:id`

If the status of a route changes a messages is published to the logs. To monitor the logs type into the terminal `docker-compose logs -f api`.

# Additional Notes
The intention of this app is to provide a demonstration of general implementation and coding patterns. Though functional, due to the expected timeframe there are areas that would be considered incomplete and not production ready. 

## Work that needs to be done
- Some automated tests have been set up, but more case coverage would be needed.
- I've included the `API_KEY` as and environmental variable in the docker-compose file for demo purposes. Committing this within the repo poses a secruity risk. This should be removed and `API_KEY` should be injected during the build and deployment process.
