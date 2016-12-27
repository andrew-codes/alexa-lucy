FROM node:boron

# Create app directory
RUN mkdir -p /usr/app/config
RUN mkdir -p /usr/app/dist
WORKDIR /usr/src

# Install app dependencies
COPY package.json /usr/app
RUN npm install

# Copy over application code and example config
COPY ./dist /usr/app/dist

EXPOSE 80
CMD [ "npm", "start" ]
