FROM node:10
WORKDIR /app
COPY package*.json ./
RUN npm install -g

COPY . .
CMD ["npm", "run", "serve"]
