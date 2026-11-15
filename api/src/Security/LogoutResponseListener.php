<?php

declare(strict_types=1);

namespace App\Security;

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Event\LogoutEvent;

// Répond 204 à la déconnexion au lieu d'une redirection (API sans session)
// Answers 204 on sign-out instead of a redirect (stateless API)
#[AsEventListener(event: LogoutEvent::class, priority: -100)]
final class LogoutResponseListener
{
    public function __invoke(LogoutEvent $event): void
    {
        $event->setResponse(new Response(status: Response::HTTP_NO_CONTENT));
    }
}
