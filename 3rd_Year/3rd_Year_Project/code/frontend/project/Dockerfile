FROM node:21-alpine3.18 as development
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . /app

##CMD [ "npm", "start"]
#
##FROM development AS build
#
#RUN npm run build
#
#FROM development as dev-envs
#RUN <<EOF
#apt-get update
#apt-get install -y --no-install-recommends git
#EOF
#
#RUN <<EOF
#useradd -s /bin/bash -m vscode
#groupadd docker
#usermod -aG docker vscode
#EOF
## install Docker tools (cli, buildx, compose)
#COPY --from=gloursdocker/docker / /
#CMD [ "npm", "run", "dev"]
#
## 2. For Nginx setup
#FROM nginx:alpine
#
## Copy config nginx
#COPY --from=build /app/.nginx/default.conf /etc/nginx/conf.d/default.conf
#
#WORKDIR /usr/share/nginx/html
#
## Remove default nginx static assets
#RUN rm -rf ./*
#
## Copy static assets from builder stage
#COPY --from=build /app/dist .
#
## Containers run nginx with global directives and daemon off
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
#