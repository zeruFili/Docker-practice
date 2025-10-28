FROM node:18-alpine

#Create a app directory
WORKDIR /app

#Install app dependencies
COPY package*.json ./

# Run npm install, but only for production dependencies
RUN npm install --only=production

#Bundle app souce
COPY . .

EXPOSE 3000

USER node

CMD [ "npm", "start" ]