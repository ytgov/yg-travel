FROM node:10
WORKDIR /app
COPY package*.json ./
RUN npm install -g
RUN npm install -g @vue/cli
COPY . .
CMD ["npm", "run", "serve"]
