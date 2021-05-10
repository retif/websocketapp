FROM node:8.6 as build
WORKDIR /server
COPY package.json /server/
RUN npm install
COPY ./ /server
EXPOSE 443
CMD ["npm", "run", "server"]