FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/config
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app
RUN npm install

# Copy over application code and example config
COPY ./src /usr/src/app

EXPOSE 80
CMD [ "npm", "start" ]
