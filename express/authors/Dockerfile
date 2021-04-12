FROM node:14-alpine
WORKDIR /usr/src/books
COPY ./authors/package*.json ./
COPY ./authors ./
RUN npm install --silent
EXPOSE 3001
CMD npm run dev