FROM node:boron

# Create app directory
RUN mkdir /app
WORKDIR /app

# Copy over application code
COPY package.json /app
COPY user.config.js /app
COPY dist /app/dist

# Install app dependencies
RUN npm install --production

EXPOSE 8080
CMD [ "npm", "run", "deployment/production/start" ]
