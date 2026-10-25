<?php

// Point d'entrée HTTP (FrankenPHP / Caddy sert /app/public dans l'image)
// HTTP entry point (FrankenPHP / Caddy serves /app/public in the image)
use App\Kernel;

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
