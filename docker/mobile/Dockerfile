# syntax=docker/dockerfile:1
# Image de développement et de CI pour l'application React Native (Expo).
# Development and CI image for the React Native (Expo) app.
# Ne se déploie pas sur Kubernetes : les builds iOS et Android passent par EAS.
# Not deployed to Kubernetes: iOS and Android builds go through EAS.
# Build depuis la racine du dépôt : docker build -f docker/mobile/Dockerfile -t ludmigo-mobile .
# Build from the repository root: docker build -f docker/mobile/Dockerfile -t ludmigo-mobile .

FROM node:24-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/ packages/
COPY web/package.json web/
COPY mobile/ mobile/

RUN npm ci --workspace=mobile --include-workspace-root

WORKDIR /app/mobile

# Metro (serveur de développement Expo)
# Metro (Expo development server)
EXPOSE 8081
CMD ["npx", "expo", "start", "--host", "lan"]
