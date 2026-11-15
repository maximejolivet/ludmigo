<?php

declare(strict_types=1);

namespace App\OpenApi;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\Model\Server;
use ApiPlatform\OpenApi\OpenApi;
use Symfony\Component\DependencyInjection\Attribute\AsDecorator;
use Symfony\Component\DependencyInjection\Attribute\AutowireDecorated;

// Liste déroulante « Servers » de Swagger UI : les adresses locales du Makefile (`make urls`).
// La documentation est désactivée en production, donc aucune adresse de production ici.
// "Servers" dropdown of Swagger UI: the local addresses from the Makefile (`make urls`).
// The documentation is disabled in production, so no production address here.
#[AsDecorator(decorates: 'api_platform.openapi.factory')]
final class ServersOpenApiFactory implements OpenApiFactoryInterface
{
    public function __construct(
        #[AutowireDecorated]
        private readonly OpenApiFactoryInterface $decorated,
    ) {
    }

    /** @param array<string, mixed> $context */
    public function __invoke(array $context = []): OpenApi
    {
        return ($this->decorated)($context)->withServers([
            new Server('http://127.0.0.1:8000', 'Local (direct)'),
            new Server('http://ludmigo.test', 'Local (proxy ludmigo.test)'),
        ]);
    }
}
