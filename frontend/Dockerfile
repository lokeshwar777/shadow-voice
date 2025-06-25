# Stage 1 : build app
FROM node:24-alpine AS builder
WORKDIR /frontend-app
COPY . .
RUN npm ci
RUN npm run build

# Stage 2 : serve app usign NGINX
FROM nginx:alpine
COPY --from=builder /frontend-app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"] 
