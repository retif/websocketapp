FROM node:latest as build
WORKDIR /server
COPY package.json /server/
RUN npm install
COPY ./ /server
CMD ["npm", "start"]
