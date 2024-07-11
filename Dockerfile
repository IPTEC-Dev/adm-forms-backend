# Use a imagem base oficial do Node.js
FROM node:20.11.1-alpine

# Instala o yarn globalmente
RUN npm install -g yarn

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instala as dependências do projeto
RUN yarn install

# Copia o restante do código da aplicação para o diretório de trabalho
COPY . .

# Compila o código TypeScript
RUN yarn build

# Define a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["yarn", "dev"]
