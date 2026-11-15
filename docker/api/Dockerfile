# syntax=docker/dockerfile:1
# Build depuis la racine du dépôt : docker build -f docker/api/Dockerfile -t ludmigo-api .
# Build from the repository root: docker build -f docker/api/Dockerfile -t ludmigo-api .

# 1. Dépendances PHP de production
# 1. Production PHP dependencies
FROM composer:2 AS vendor
WORKDIR /app
COPY api/ ./
# Les extensions intl et pdo_mysql sont installées dans l'étage runtime : on les ignore ici
# The intl and pdo_mysql extensions are installed in the runtime stage: ignored here
RUN composer install --no-dev --no-interaction --no-progress --prefer-dist --optimize-autoloader --no-scripts \
    --ignore-platform-req=ext-intl --ignore-platform-req=ext-pdo_mysql

# 2. Runtime : FrankenPHP (serveur HTTP et PHP dans un seul conteneur)
# 2. Runtime: FrankenPHP (HTTP server and PHP in a single container)
FROM dunglas/frankenphp:1-php8.5-alpine AS runtime

RUN install-php-extensions pdo_mysql pdo_pgsql intl zip opcache

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

# Exécution sans root : FrankenPHP (Caddy) écrit dans /data/caddy et /config/caddy, le port 8080 n'est pas privilégié
# Run without root: FrankenPHP (Caddy) writes to /data/caddy and /config/caddy, port 8080 is unprivileged
RUN mkdir -p /data/caddy /config/caddy \
    && chown -R www-data:www-data /data/caddy /config/caddy
USER www-data

EXPOSE 8080
