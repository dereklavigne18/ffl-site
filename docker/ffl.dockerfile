FROM node:latest

COPY . /app/
WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "start:production"]
