FROM node:alpine AS builder
ENV NODE_ENV development
WORKDIR /code
COPY ./package.json /code/package.json
RUN yarn
COPY . /code
RUN yarn build
FROM nginx:1.24-alpine
COPY --from=builder /code/dist /usr/share/nginx/html
#COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]