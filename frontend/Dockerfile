FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install --verbose

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]
