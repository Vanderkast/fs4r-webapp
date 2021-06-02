FROM node:16 as build
WORKDIR /app
COPY package.json /
RUN yarn
RUN yarn upgrade
COPY . .
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]