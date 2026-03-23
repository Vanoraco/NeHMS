FROM node:18-alpine AS build
WORKDIR /app
COPY front/package*.json ./
RUN npm ci
COPY front/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/hmsfrontend/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
