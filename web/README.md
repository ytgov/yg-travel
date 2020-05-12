# yg-travel

This repository contains the solution for the YG Travel Portal App.  It contains Node/Express/Vue container for front end and API access and a PostGres database for storage.  The containers are orchastrated with docker-compose.  It is available within YG at https://travel.ynet.gov.yk.ca

## To get started:

1. Run cp .env.base .env and replace 'ABC123' actual connection parameters
2. In the root of the project run `docker-composer build` to build the containers and initalize the database.  This will build 2 linked containers named: <<container1>> and <<container2>
3. Run `docker compose up -d to start the container the service

## Notes:
### Deploying app updates - preserving existing data
1. Pull fresh code from the respository
2. Run `docker-compose build`
3. Bring the service up with `docker-compose up -d`

### Deploying app updates - and reinitializing the database
1. Pull fresh code from the respository
2. Run `docker-compose down --volumes` to take down the service and wipe any attached volumes
3. Run `docker-compose build`
4. Bring the service up with `docker-compose up -d`

### Developing new features
- the API is hosted from the same server that hosts Vue app so some extra step are required to enable live development i.e. using `npm run serve`
- TODO: create a durable approach to support development
