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
RUN npm run build

# Stage 3 - Set up build files on Nginx
FROM nginx:alpine AS production
EXPOSE 80
COPY ./deploy/nginx/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm -rf ./*
# Copies static resources from builder stage
COPY --from=builder /app/dist .
RUN chown -R 1000:1000 /app
USER 1000
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
