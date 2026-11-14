<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

// Données d'inscription (voir docs/05_BACKEND_SCHEMA.md, « Validation des données »)
// Sign-up payload (see docs/05_BACKEND_SCHEMA.md, "Data validation")
final class RegisterRequest
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Email]
        #[Assert\Length(max: 180)]
        public readonly string $email = '',

        // 12 caractères minimum, avec au moins une lettre et un chiffre
        // 12 characters minimum, with at least one letter and one digit
        #[Assert\NotBlank]
        #[Assert\Length(min: 12, max: 4096)]
        #[Assert\Regex(pattern: '/\p{L}/u', message: 'The password must contain at least one letter.')]
        #[Assert\Regex(pattern: '/\d/', message: 'The password must contain at least one digit.')]
        public readonly string $password = '',
        #[Assert\NotBlank]
        #[Assert\Length(min: 3, max: 40)]
        #[Assert\Regex(pattern: '/^[A-Za-z0-9_-]+$/', message: 'Letters, digits, hyphens and underscores only.')]
        public readonly string $pseudo = '',
    ) {
    }
}
