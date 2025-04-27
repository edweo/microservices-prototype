FROM node:18-alpine

WORKDIR app

COPY package*.json .

RUN npm i

# Copy everything except ignered files by .dockerignore
COPY . .

RUN npm run build

CMD ["npm", "run", "preview"]
