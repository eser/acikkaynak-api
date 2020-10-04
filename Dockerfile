# Arguments
ARG NODE_ENV=production
ARG PORT=3001


# STAGE-1
# Install Node.js docker container
FROM node:alpine as builder

# Requirements
RUN apk add python make g++

# Install app dependencies
# ensure both package.json AND package-lock.json are copied
ADD ./package.json ./package-lock.json ./

RUN npm install --production


# STAGE-2
# Install Node.js docker container
FROM node:alpine

# Environment variables
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

# Create app directory
WORKDIR /usr/src/app

# Transfer app dependencies
COPY --from=builder ./node_modules ./node_modules

# Bundle app source
COPY ./ ./

EXPOSE ${PORT}

CMD ["npm", "start"]
