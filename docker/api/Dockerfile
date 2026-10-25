# syntax=docker/dockerfile:1
# Build depuis la racine du dépôt : docker build -f docker/api/Dockerfile -t ludmigo-api .
# Build from the repository root: docker build -f docker/api/Dockerfile -t ludmigo-api .

# 1. Dépendances PHP de production
# 1. Production PHP dependencies
FROM composer:2 AS vendor
WORKDIR /app
COPY api/ ./
RUN composer install --no-dev --no-interaction --no-progress --prefer-dist --optimize-autoloader --no-scripts

# 2. Runtime : FrankenPHP (serveur HTTP et PHP dans un seul conteneur)
# 2. Runtime: FrankenPHP (HTTP server and PHP in a single container)
FROM dunglas/frankenphp:1-php8.5-alpine AS runtime

RUN install-php-extensions pdo_mysql intl zip opcache

ENV APP_ENV=prod \
    APP_DEBUG=0 \
    SERVER_NAME=:8080

WORKDIR /app

COPY docker/api/php.ini $PHP_INI_DIR/conf.d/app.ini
COPY docker/api/Caddyfile /etc/frankenphp/Caddyfile
COPY --from=vendor /app/ ./

# Cache de production généré au build (APP_SECRET factice, uniquement pour le build)
# Production cache generated at build time (dummy APP_SECRET, build only)
RUN APP_SECRET=build-only php bin/console cache:warmup --env=prod \
    && chown -R www-data:www-data var

EXPOSE 8080
