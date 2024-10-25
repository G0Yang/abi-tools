FROM node:20 as builder

WORKDIR /build
COPY / /build

RUN npm install
RUN npm run build

FROM nginx:alpine3.20-slim
LABEL authors="ender"

COPY --from=builder /build/out /usr/share/nginx/html
COPY /docker/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]