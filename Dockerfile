# Stage 1 - Development image
FROM node:16-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install && rm -rf /usr/local/share/.cache/*
COPY . ./
RUN chown -R 1000:1000 /app
USER 1000
CMD npm run dev

# Stage 2 - Building app
FROM development AS builder
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Stage 3 - Set up build files on Nginx
FROM nginxinc/nginx-unprivileged:stable-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080
USER 101
CMD ["nginx", "-g", "daemon off;"]
