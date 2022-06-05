# Homitag

## Task Description
Your company is building an API using Microservices architecture and Docker deployment for a new application that will compete with Netflix. You were hired to build two services (Genres and Movies) using Node.js and your preferred database engine. Only the basic actions (index, show, insert, and delete) is required. The minimal fields for Genres are name and description. For Movies, the minimal fields are name, description, release date, Genre(s), duration and rating.

Please design and develop a solution for this requirement, create the unit tests required and upload the result code to a free Heroku environment. 

The expected deliverable should include the final code and unit tests in a repository and the API in a Heroku environment using Docker.

## Local Developemt with Docker

```bash

# Install all node dependencies
npm install

# Make sure to have docker-compose on the system
# The following command will spin up containers for MongoDB and Redis
docker-compose -f docker-compose.dev.yml up -d

# Start the development server
# The following command will start the express server locally
# It will connect to MongoDB and Redis containers
npm run dev

```

## Deploy on Production Server with Docker

```bash

# Make sure to have docker-compose on the system
# The following command will build the image from the Dockerfile
# It will spin up MongoDB and Redis and Web app on the same network
# Containers will communicate using service name as hosts
docker-compose -f docker-compose.prod.yml up -d

# The web app expose port 9000 which is configurable through src/env/development.json

```

## Database Volume

MongoDB container mounts volume to `data/` where all data persists.

## Logging

The logging module `winston` outputs to console and writes to  `logs/app.log` file