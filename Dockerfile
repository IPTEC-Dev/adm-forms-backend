FROM node:20.11.1-alpine
RUN apk add --no-cache bash
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm cache clean --force && npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD bash -c 'while !</dev/tcp/postgres/5432; do sleep 1; done; npm run prisma:generate && npm run prisma:migrate && npm run start'
