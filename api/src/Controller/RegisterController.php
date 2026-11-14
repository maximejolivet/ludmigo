<?php

namespace App\Controller;

use App\Dto\RegisterRequest;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

// Inscription : crée un compte avec le rôle ROLE_USER (jamais ROLE_ADMIN)
// Sign-up: creates an account with ROLE_USER (never ROLE_ADMIN)
final class RegisterController
{
    #[Route('/api/auth/register', name: 'api_auth_register', methods: ['POST'])]
    public function __invoke(
        #[MapRequestPayload] RegisterRequest $payload,
        ValidatorInterface $validator,
        UserPasswordHasherInterface $hasher,
        EntityManagerInterface $em,
    ): JsonResponse {
        $user = (new User())
            ->setEmail($payload->email)
            ->setPseudo($payload->pseudo);

        // Unicité de l'email et du pseudo / Email and pseudo uniqueness
        $violations = $validator->validate($user);
        if (\count($violations) > 0) {
            return $this->violations($violations);
        }

        $user->setPassword($hasher->hashPassword($user, $payload->password));
        $em->persist($user);
        $em->flush();

        return new JsonResponse([
            'id' => (string) $user->getId(),
            'email' => $user->getEmail(),
            'pseudo' => $user->getPseudo(),
        ], Response::HTTP_CREATED);
    }

    private function violations(ConstraintViolationListInterface $violations): JsonResponse
    {
        $items = [];
        foreach ($violations as $violation) {
            $items[] = ['propertyPath' => $violation->getPropertyPath(), 'message' => $violation->getMessage()];
        }

        return new JsonResponse(['violations' => $items], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
