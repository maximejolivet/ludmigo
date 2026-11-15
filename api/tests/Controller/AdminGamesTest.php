<?php

namespace App\Tests\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

// Ressource /api/games : gérée uniquement par les administrateurs
// /api/games resource: managed by administrators only
final class AdminGamesTest extends WebTestCase
{
    private KernelBrowser $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $db = static::getContainer()->get(EntityManagerInterface::class)->getConnection();
        $db->executeStatement('DELETE FROM refresh_token');
        $db->executeStatement('DELETE FROM game');
        $db->executeStatement('DELETE FROM user');
    }

    private function tokenFor(string $email, string $pseudo, bool $admin = false): string
    {
        $json = ['CONTENT_TYPE' => 'application/json'];
        $this->client->request('POST', '/api/auth/register', server: $json, content: json_encode(['email' => $email, 'password' => 'correct-horse-1', 'pseudo' => $pseudo], \JSON_THROW_ON_ERROR));
        if ($admin) {
            static::getContainer()->get(EntityManagerInterface::class)->getConnection()
                ->executeStatement('UPDATE user SET roles = ? WHERE email = ?', ['["ROLE_ADMIN"]', $email]);
        }
        $this->client->request('POST', '/api/auth/login', server: $json, content: json_encode(['email' => $email, 'password' => 'correct-horse-1'], \JSON_THROW_ON_ERROR));

        return json_decode((string) $this->client->getResponse()->getContent(), true)['token'];
    }

    /** @param array<string, mixed>|null $body */
    private function call(string $method, string $uri, string $token, ?array $body = null): void
    {
        $this->client->request($method, $uri, server: [
            'HTTP_AUTHORIZATION' => 'Bearer '.$token,
            'HTTP_ACCEPT' => 'application/ld+json',
            'CONTENT_TYPE' => 'PATCH' === $method ? 'application/merge-patch+json' : 'application/ld+json',
        ], content: null === $body ? null : json_encode($body, \JSON_THROW_ON_ERROR));
    }

    // Un joueur ne peut ni lister ni créer un jeu
    // A player can neither list nor create a game
    public function testPlayerIsForbidden(): void
    {
        $token = $this->tokenFor('player@example.com', 'player');

        $this->call('GET', '/api/games', $token);
        $this->assertResponseStatusCodeSame(403);
        $this->call('POST', '/api/games', $token, ['name' => 'Catan', 'minPlayers' => 3, 'maxPlayers' => 4]);
        $this->assertResponseStatusCodeSame(403);
    }

    // Sans jeton : 401
    // Without a token: 401
    public function testAnonymousIsUnauthorized(): void
    {
        $this->client->request('GET', '/api/games');
        $this->assertResponseStatusCodeSame(401);
    }

    // Un administrateur crée, modifie, liste et supprime un jeu
    // An administrator creates, updates, lists and deletes a game
    public function testAdminManagesGames(): void
    {
        $token = $this->tokenFor('boss@example.com', 'boss', true);

        $this->call('POST', '/api/games', $token, ['name' => 'Catan', 'minPlayers' => 3, 'maxPlayers' => 4, 'durationMinutes' => 90, 'difficulty' => 'intermediate']);
        $this->assertResponseStatusCodeSame(201);
        $iri = json_decode((string) $this->client->getResponse()->getContent(), true)['@id'];

        $this->call('PATCH', $iri, $token, ['maxPlayers' => 6]);
        $this->assertResponseIsSuccessful();
        $this->assertStringContainsString('"maxPlayers":6', (string) $this->client->getResponse()->getContent());

        $this->call('GET', '/api/games?name=cat', $token);
        $this->assertResponseIsSuccessful();
        $this->assertStringContainsString('Catan', (string) $this->client->getResponse()->getContent());

        $this->call('DELETE', $iri, $token);
        $this->assertResponseStatusCodeSame(204);
    }

    // Validation : le maximum de joueurs ne peut pas être inférieur au minimum
    // Validation: the maximum of players cannot be lower than the minimum
    public function testMaxPlayersMustBeAtLeastMinPlayers(): void
    {
        $token = $this->tokenFor('boss@example.com', 'boss', true);

        $this->call('POST', '/api/games', $token, ['name' => 'Catan', 'minPlayers' => 4, 'maxPlayers' => 2]);
        $this->assertResponseStatusCodeSame(422);
    }
}
