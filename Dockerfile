FROM node:20-alpine as builder

WORKDIR /build
COPY / /build

RUN yarn set version 4.5.0
RUN yarn config set nodeLinker node-modules
RUN yarn
RUN yarn build

FROM nginx:alpine3.20-slim
LABEL authors="ender"

COPY --from=builder /build/out /usr/share/nginx/html
COPY /docker/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]