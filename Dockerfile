FROM node:15.5.1-alpine3.10
WORKDIR /usr/app
RUN apk update && apk add bash
COPY . .