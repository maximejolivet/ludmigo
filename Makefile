
# Commandes de développement local pour Ludmigo.
# Local development commands for Ludmigo.
# Prérequis : Docker, PHP 8.5, Composer, Node.js 24. Lancer `make help` pour la liste.
# Prerequisites: Docker, PHP 8.5, Composer, Node.js 24. Run `make help` for the list.

SHELL := /bin/bash
.DEFAULT_GOAL := overview

COMPOSE := docker compose
API_DIR := api
WEB_DIR := web
MOBILE_DIR := mobile
DB_URL := mysql://ludmigo:ludmigo@127.0.0.1:3306/ludmigo?serverVersion=mariadb-10.11.0&charset=utf8mb4

# Versions cibles (à garder synchronisées avec les Dockerfiles et le README)
# Target versions (keep in sync with the Dockerfiles and README)
PHP_VERSION := 8.5
NODE_VERSION := 24
MARIADB_VERSION := 10.11
SYMFONY_VERSION := 7
REACT_VERSION := 19

# Domaines
# Domains
DOMAIN_FR := https://ludmigo.fr
DOMAIN_WORLD := https://ludmigo.com
DOMAIN_LOCAL := http://ludmigo.test

.PHONY: overview help setup dev stop urls info outdated install hosts proxy-up db-up db-down db-logs db-shell db-reset api-env api-deps migrate api-serve web-dev mobile-start test lint build docker-build

# Cible par défaut (`make` seul) : infos du projet, dépendances obsolètes, puis la liste des commandes
# Default target (plain `make`): project info, outdated dependencies, then the command list
overview: info outdated help

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*## "} {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'

setup: install hosts db-up api-env migrate ## First-time setup (dependencies, /etc/hosts, database, migrations)

dev: hosts db-up proxy-up api-env migrate ## Start the database and proxy, then the API and web app. Ctrl+C stops the API and web app
	@$(MAKE) --no-print-directory urls
	@$(MAKE) -j2 api-serve web-dev

stop: ## Stop all containers (data is kept)
	$(COMPOSE) stop

urls: ## Show the development URLs
	@echo ""
	@echo "  Web app           http://ludmigo.test"
	@echo "  API               http://ludmigo.test/api"
	@echo "  API (direct)      http://127.0.0.1:8000"
	@echo "  Vite (direct)     http://localhost:5173"
	@echo "  MariaDB           127.0.0.1:3306  (ludmigo / ludmigo)"
	@echo "  Expo (mobile)     run 'make mobile-start'"
	@echo ""

# Infos du projet : domaines, dernier commit, versions cibles et installées
# Project info: domains, last commit, target and installed versions
info: ## Show domains, last commit and versions
	@echo ""
	@echo "  Ludmigo"
	@echo "  Domains (prod)    $(DOMAIN_FR)  (fr)"
	@echo "                    $(DOMAIN_WORLD)  (world)"
	@echo "  Domain (local)    $(DOMAIN_LOCAL)"
	@echo "  Branch            $$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo n/a)"
	@echo "  Last commit       $$(git log -1 --format='%h %s (%ar)' 2>/dev/null || echo n/a)"
	@echo ""
	@echo "  Target versions"
	@echo "    PHP $(PHP_VERSION) · Node.js $(NODE_VERSION) · MariaDB $(MARIADB_VERSION) · Symfony $(SYMFONY_VERSION) · React $(REACT_VERSION)"
	@echo ""
	@echo "  Installed"
	@echo "    $$(php -v 2>/dev/null | head -1 || echo 'php: missing')"
	@echo "    node $$(node -v 2>/dev/null || echo missing)"
	@echo "    npm $$(npm -v 2>/dev/null || echo missing)"
	@echo "    $$(composer --version 2>/dev/null | head -1 || echo 'composer: missing')"
	@echo "    $$(docker --version 2>/dev/null || echo 'docker: missing')"
	@echo ""

# Vérifie les mises à jour de dépendances (Composer dans api/, npm à la racine)
# Check for dependency updates (Composer in api/, npm at the root)
outdated: ## Check for Composer and npm dependency updates
	@if [ -d $(API_DIR) ]; then cd $(API_DIR) && composer outdated --direct || true; else echo "api/ not found, skipping Composer"; fi
	@npm outdated || true

install: ## Install PHP and JavaScript dependencies
	cd $(API_DIR) && composer install
	npm install

# --- Domaine local ---
# --- Local domain ---

hosts: ## Add ludmigo.test to /etc/hosts (asks for the sudo password once)
	@grep -q 'ludmigo.test' /etc/hosts || echo '127.0.0.1 ludmigo.test' | sudo tee -a /etc/hosts >/dev/null
	@echo "ludmigo.test -> 127.0.0.1 OK"

proxy-up: ## Start the local proxy on http://ludmigo.test
	$(COMPOSE) up -d proxy

# --- Base de données ---
# --- Database ---

db-up: ## Start MariaDB and wait until it is ready
	$(COMPOSE) up -d --wait db

db-down: ## Stop MariaDB (data is kept)
	$(COMPOSE) stop db

db-logs: ## Show MariaDB logs
	$(COMPOSE) logs -f db

db-shell: ## Open a SQL client on the ludmigo database
	$(COMPOSE) exec db mariadb -uludmigo -pludmigo ludmigo

db-reset: ## DESTROY local data, then recreate an empty database
	$(COMPOSE) down -v
	$(MAKE) db-up

# --- API Symfony ---
# --- Symfony API ---

api-env: ## Create api/.env.local with the local MariaDB connection (does not overwrite an existing file)
	@test -d $(API_DIR) || (echo "The $(API_DIR)/ folder does not exist yet." && exit 1)
	@test -f $(API_DIR)/.env.local || printf 'DATABASE_URL="%s"\n' '$(DB_URL)' > $(API_DIR)/.env.local
	@echo "api/.env.local OK"

# Vérifie que les dépendances Composer sont installées (non listé dans make help)
# Check that Composer dependencies are installed (not listed in make help)
api-deps:
	@test -d $(API_DIR)/vendor || (echo "api/vendor is missing: run 'make install' first." && exit 1)

migrate: api-deps ## Apply Doctrine migrations
	cd $(API_DIR) && php bin/console doctrine:migrations:migrate --no-interaction

api-serve: api-deps ## Start the API on http://127.0.0.1:8000
	cd $(API_DIR) && php -S 127.0.0.1:8000 -t public

# --- Web et mobile ---
# --- Web and mobile ---

web-dev: ## Start the React web app on http://localhost:5173
	npm run dev -w $(WEB_DIR)

mobile-start: ## Start Expo (Metro) for iOS or Android
	npm run start -w $(MOBILE_DIR)

# --- Qualité ---
# --- Quality ---

test: api-deps ## Run the API, web and mobile tests
	cd $(API_DIR) && composer test
	npm run test -w $(WEB_DIR)
	npm run test -w $(MOBILE_DIR)

lint: api-deps ## Run the PHP linters (CS-Fixer, PHPStan) and TypeScript lint (web, mobile)
	cd $(API_DIR) && composer cs:check
	cd $(API_DIR) && composer phpstan
	npm run lint

build: ## Production build of the web app
	npm run build -w $(WEB_DIR)

docker-build: ## Build the production images (API, web)
	docker build -f docker/api/Dockerfile -t ludmigo-api:local .
	docker build -f docker/web/Dockerfile -t ludmigo-web:local .
