FROM node:boron

RUN mkdir -p /app/src
RUN mkdir -p /app/dev
WORKDIR /app

COPY package.json /app
COPY .babelrc /app
COPY user.config.js /app
COPY dev/dev-server.js /app/dev

# Install app dependencies
RUN npm install

EXPOSE 8080 8443
CMD [ "npm", "run", "start/local" ]
