<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken as BaseRefreshToken;

// Jeton de rafraîchissement (30 jours), stocké haché ; révoqué à la déconnexion
// Refresh token (30 days), stored hashed; revoked on sign-out
#[ORM\Entity]
#[ORM\Table(name: 'refresh_token')]
class RefreshToken extends BaseRefreshToken
{
}
