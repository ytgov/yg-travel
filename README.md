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
To create your locla develompment environment: 

1. Pull fresh code from the repository
2. Run `docker-compose build` to build the various container
3. Bring the service up with `docker-compose up -d`

#### Developing front-end features
1. Ensure the docker container for the api and the database are running.
2. Change into the `web` directory.
3. Run `npm run serve` to bring up a Vue development environment.

*Remember to rebuild your docker containters before deloying your changes*

#### Developing API featuers
The current configuration does not lend itself well to live API changes.  Currently, the API docker container needs to be rebuilt for each change to the API configuration.  To make API changes:

1. Change in the `api` directory.
2. Make changes to app.js (or queries.js).
3. Rebuild the docker container using the command `docker-compose build server`.
4. Launch the new changes by running `docker-compose up -d`. 
5. Test your API changes using Postman, Insomnia or a similar tool.




