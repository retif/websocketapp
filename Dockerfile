FROM node:8.6 as build

RUN npm install

EXPOSE 443

CMD ["npm", "run", "server"]