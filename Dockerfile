FROM node:16

# Working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install

# Bundle app
COPY . .

EXPOSE 3000

CMD ["npm", "start"]