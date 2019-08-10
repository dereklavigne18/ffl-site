FROM node:latest

COPY docker /app/
WORKDIR /app

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
