FROM node:boron

# Create app directory
RUN mkdir -p /app/dist
WORKDIR /app

# Copy over application code
COPY package.json /app
COPY ./dist /app/dist

# Install app dependencies
RUN npm install --production

EXPOSE 8080 8443
CMD [ "npm", "start" ]
