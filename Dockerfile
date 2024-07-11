
FROM node:20.11.1-alpine


WORKDIR /app


COPY package.json package-lock.json ./


RUN npm cache clean --force && npm install


COPY . .


RUN npm run build


EXPOSE 3000


CMD ["npm", "run", "dev"]
