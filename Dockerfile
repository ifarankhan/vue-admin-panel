#Build stage
FROM node:14 as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --legacy-peer-deps
COPY . /app
RUN npm run build


#Deploy stage
FROM nginx:1.19.5-alpine
COPY nginx.conf /etc/nginx/nginx.conf
# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY .env /
COPY create-env-config.sh /
RUN chmod +x create-env-config.sh && chmod 777 create-env-config.sh
EXPOSE 80

ENTRYPOINT [ "sh", "/create-env-config.sh" ]
