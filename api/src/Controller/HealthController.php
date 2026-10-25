<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

// Contrôle de santé, utilisé par les sondes (Docker, Kubernetes) et la suite de tests
// Health check, used by probes (Docker, Kubernetes) and the test suite
final class HealthController
{
    #[Route('/api/health', name: 'api_health', methods: ['GET'])]
    public function __invoke(): JsonResponse
    {
        return new JsonResponse(['status' => 'ok']);
    }
}
