# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.16.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
RUN mkdir -p /servidor/node_modules && chown -R node:node /servidor

WORKDIR /servidor

COPY --chown=node:node ./package*.json ./

USER node

RUN npm install

COPY --chown=node:node . . 
# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
EXPOSE 8080

# Run the application.
CMD ["node", "webserver.js"]
