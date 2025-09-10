FROM node:20-alpine  
WORKDIR /src

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm i -g @nestjs/cli

# Copy source code
COPY . .

# Build the application
RUN npm run build

ARG PORT=3000
EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]