<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

// Profil complet de l'utilisateur connecté (jamais le mot de passe)
// Full profile of the signed-in user (never the password)
final class MeController
{
    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function __invoke(#[CurrentUser] User $user): JsonResponse
    {
        return new JsonResponse([
            'id' => (string) $user->getId(),
            'email' => $user->getEmail(),
            'pseudo' => $user->getPseudo(),
            'city' => $user->getCity(),
            'roles' => $user->getRoles(),
            'createdAt' => $user->getCreatedAt()->format(\DATE_ATOM),
        ]);
    }
}
