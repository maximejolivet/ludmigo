<?php

namespace App\Tests\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

// Ressource /api/users : réservée aux administrateurs, jamais le mot de passe
// /api/users resource: reserved for administrators, never the password
final class AdminUsersTest extends WebTestCase
{
    private KernelBrowser $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $db = static::getContainer()->get(EntityManagerInterface::class)->getConnection();
        $db->executeStatement('DELETE FROM refresh_token');
        $db->executeStatement('DELETE FROM user');
    }

    private function tokenFor(string $email, string $pseudo): string
    {
        $json = ['CONTENT_TYPE' => 'application/json'];
        $this->client->request('POST', '/api/auth/register', server: $json, content: json_encode(['email' => $email, 'password' => 'correct-horse-1', 'pseudo' => $pseudo], \JSON_THROW_ON_ERROR));
        $this->client->request('POST', '/api/auth/login', server: $json, content: json_encode(['email' => $email, 'password' => 'correct-horse-1'], \JSON_THROW_ON_ERROR));

        return json_decode((string) $this->client->getResponse()->getContent(), true)['token'];
    }

    private function promote(string $email): void
    {
        static::getContainer()->get(EntityManagerInterface::class)->getConnection()
            ->executeStatement('UPDATE user SET roles = ? WHERE email = ?', ['["ROLE_ADMIN"]', $email]);
    }

    // Un joueur ne peut pas lister les utilisateurs
    // A player cannot list the users
    public function testPlayerIsForbidden(): void
    {
        $token = $this->tokenFor('player@example.com', 'player');

        $this->client->request('GET', '/api/users', server: ['HTTP_AUTHORIZATION' => 'Bearer '.$token]);
        $this->assertResponseStatusCodeSame(403);
    }

    // Sans jeton : 401
    // Without a token: 401
    public function testAnonymousIsUnauthorized(): void
    {
        $this->client->request('GET', '/api/users');
        $this->assertResponseStatusCodeSame(401);
    }

    // Un administrateur liste les utilisateurs, sans mot de passe
    // An administrator lists the users, without the password
    public function testAdminListsUsersWithoutPassword(): void
    {
        $this->tokenFor('player@example.com', 'player');
        $this->tokenFor('boss@example.com', 'boss');
        $this->promote('boss@example.com');
        // Le rôle est lu en base à chaque requête : on se reconnecte pour obtenir un jeton frais
        // The role is read from the database on each request: sign in again for a fresh token
        $this->client->request('POST', '/api/auth/login', server: ['CONTENT_TYPE' => 'application/json'], content: json_encode(['email' => 'boss@example.com', 'password' => 'correct-horse-1'], \JSON_THROW_ON_ERROR));
        $token = json_decode((string) $this->client->getResponse()->getContent(), true)['token'];

        $this->client->request('GET', '/api/users', server: ['HTTP_AUTHORIZATION' => 'Bearer '.$token, 'HTTP_ACCEPT' => 'application/ld+json']);

        $this->assertResponseIsSuccessful();
        $content = (string) $this->client->getResponse()->getContent();
        $this->assertStringContainsString('player@example.com', $content);
        $this->assertStringNotContainsString('"password"', $content);
    }
}
