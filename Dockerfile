FROM node:18-alpine3.15

# Set working directory in the container
WORKDIR /app

# COPY source destination
# package.json in current directory to /app
COPY package*.json ./


# npm ci will be significantly faster when:
    # -> There is a package-lock.json or npm-shrinkwrap.json file
    # -> The node_modules folder is missing or empty
RUN npm ci

# Copy the contents of current folder into container WORKDIR
# dockerignore will not allow specified files/folders to be copied

COPY . ./


ENTRYPOINT [ "npm", "run" ]
CMD [ "prod" ]