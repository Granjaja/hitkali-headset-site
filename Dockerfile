# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.14.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /app

# Ensure the SQLite database file directory exists and has correct permissions
RUN mkdir -p /app && chown node:node /app
################################################################################
# Create a stage for installing production dependecies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the application.
FROM deps as build

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci 

# Copy the rest of the source files into the image.
COPY . .

#Copy public folder
COPY public /app/public

# Copy the Prisma schema and generate Prisma client
COPY prisma ./prisma/

# Pass DATABASE_URL as a build argument and set it as an environment variable
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL


# Use the build argument for NEXTAUTH_SECRET
ARG SESSION_SECRET
ARG NEXTAUTH_SECRET
ENV SESSION_SECRET=$SESSION_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET


# Run the build script.
RUN npx prisma generate --schema=prisma/schema.prisma
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final

# Use production node environment by default.
ENV NODE_ENV production

# Pass NEXTAUTH_SECRET to the final stage
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# Run the application as a root user.
USER root

# Copy package.json so that package manager commands can be used.
COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node prisma ./prisma/
COPY --chown=node:node public ./public

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/.next ./.next

# Ensure node_modules is writable by the node user 
RUN chown -R node:node /app && chmod -R u+w /app/node_modules /app/public

USER node

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application/ # Generate Prisma client and apply migrations before starting

CMD ["sh", "-c", "npx prisma generate && npm start"]