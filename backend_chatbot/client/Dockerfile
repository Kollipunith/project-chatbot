FROM node:alpine
WORKDIR /usr/local/web-app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN node node_modules/esbuild/install.js
CMD [ "npm", "run", "dev" ]