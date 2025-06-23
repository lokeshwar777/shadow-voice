FROM node:24-alpine

WORKDIR /backend-app

COPY . .

RUN npm install --production

ENTRYPOINT ["node"]
CMD ["server.js"] 
