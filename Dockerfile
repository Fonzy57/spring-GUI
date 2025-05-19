# Étape 1, basé sur Node.js pour construire et compiler l'application Angular
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Étape 2, basée sur Nginx pour avoir uniquement le contenu compilé pour servir avec Nginx
RUN npm run build
FROM nginx:1.27-alpine
COPY --from=build /app/dist/spring-gui/browser/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf