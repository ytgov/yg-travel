FROM node:10
WORKDIR /app
COPY package*.json ./
RUN npm install -g
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
