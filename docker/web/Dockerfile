# syntax=docker/dockerfile:1
# Build depuis la racine du dépôt : docker build -f docker/web/Dockerfile -t ludmigo-web .
# Build from the repository root: docker build -f docker/web/Dockerfile -t ludmigo-web .

# 1. Build Vite de l'application React
# 1. Vite build of the React app
FROM node:24.22.2-alpine AS build
WORKDIR /app

# Manifestes des workspaces d'abord, pour mettre en cache l'installation
# Workspace manifests first, so the install step can be cached
COPY package.json package-lock.json ./
COPY packages/ packages/
COPY web/package.json web/
COPY mobile/package.json mobile/

RUN npm ci --workspace=web --include-workspace-root

COPY web/ web/
RUN npm run build -w web

# 2. Service des fichiers statiques
# 2. Serving static files
# Image nginx sans privilèges : processus non root, écoute sur 8080
# Unprivileged nginx image: non-root process, listens on 8080
FROM nginxinc/nginx-unprivileged:1.31-alpine AS runtime

COPY docker/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/web/dist /usr/share/nginx/html

EXPOSE 8080
