FROM node:8.6 as build
WORKDIR /server
COPY package.json /server/
RUN npm install
COPY ./ /server
EXPOSE 4433
CMD ["npm", "run", "server"]
