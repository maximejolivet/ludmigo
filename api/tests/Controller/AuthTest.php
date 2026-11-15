<?php

declare(strict_types=1);

namespace App\Tests\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

// Parcours d'inscription et de connexion (nécessite la base ludmigo_test)
// Sign-up and sign-in flow (needs the ludmigo_test database)
final class AuthTest extends WebTestCase
{
    private const PASSWORD = 'correct-horse-1';

    private KernelBrowser $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        static::getContainer()->get(EntityManagerInterface::class)
            ->getConnection()->executeStatement('DELETE FROM refresh_token');
        static::getContainer()->get(EntityManagerInterface::class)
            ->getConnection()->executeStatement('DELETE FROM user');
    }

    /** @param array<string, string> $data */
    private function post(string $uri, array $data, ?string $token = null): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        if (null !== $token) {
            $headers['HTTP_AUTHORIZATION'] = 'Bearer '.$token;
        }
        $this->client->request('POST', $uri, server: $headers, content: json_encode($data, \JSON_THROW_ON_ERROR));
    }

    private function register(string $email = 'ada@example.com', string $pseudo = 'ada'): void
    {
        $this->post('/api/auth/register', ['email' => $email, 'password' => self::PASSWORD, 'pseudo' => $pseudo]);
    }

    // Une inscription valide crée le compte et ne renvoie jamais le mot de passe
    // A valid sign-up creates the account and never returns the password
    public function testRegisterCreatesAccount(): void
    {
        $this->register('Ada@Example.com');

        $this->assertResponseStatusCodeSame(201);
        $body = json_decode((string) $this->client->getResponse()->getContent(), true);
        $this->assertSame('ada@example.com', $body['email']);
        $this->assertArrayNotHasKey('password', $body);
    }

    // Le mot de passe est refusé s'il est trop court ou sans chiffre
    // The password is rejected when too short or without a digit
    public function testRegisterRejectsWeakPassword(): void
    {
        $this->post('/api/auth/register', ['email' => 'a@example.com', 'password' => 'short1', 'pseudo' => 'ada']);
        $this->assertResponseStatusCodeSame(422);

        $this->post('/api/auth/register', ['email' => 'a@example.com', 'password' => 'only-letters-here', 'pseudo' => 'ada']);
        $this->assertResponseStatusCodeSame(422);
    }

    // L'email et le pseudo sont uniques
    // Email and pseudo are unique
    public function testRegisterRejectsDuplicates(): void
    {
        $this->register();
        $this->register('ada@example.com', 'other');
        $this->assertResponseStatusCodeSame(422);

        $this->register('other@example.com', 'ada');
        $this->assertResponseStatusCodeSame(422);
    }

    // La connexion renvoie un JWT qui ouvre une route protégée
    // Sign-in returns a JWT that opens a protected route
    public function testLoginReturnsUsableToken(): void
    {
        $this->register();
        $this->post('/api/auth/login', ['email' => 'ada@example.com', 'password' => self::PASSWORD]);

        $this->assertResponseIsSuccessful();
        $token = json_decode((string) $this->client->getResponse()->getContent(), true)['token'];
        $this->assertNotEmpty($token);

        $this->client->request('GET', '/api/me', server: ['HTTP_AUTHORIZATION' => 'Bearer '.$token]);
        $this->assertResponseIsSuccessful();
        $me = json_decode((string) $this->client->getResponse()->getContent(), true);
        $this->assertSame('ada@example.com', $me['email']);
        $this->assertArrayNotHasKey('password', $me);
    }

    // Mauvais mot de passe : 401, et une route protégée sans jeton : 401
    // Wrong password: 401, and a protected route without a token: 401
    public function testBadCredentialsAndMissingTokenAreRejected(): void
    {
        $this->register();
        $this->post('/api/auth/login', ['email' => 'ada@example.com', 'password' => 'wrong-password-1']);
        $this->assertResponseStatusCodeSame(401);

        $this->client->request('GET', '/api/me');
        $this->assertResponseStatusCodeSame(401);
    }

    // Un compte supprimé (suppression logique) ne peut plus se connecter
    // A deleted account (soft deletion) can no longer sign in
    public function testDeletedAccountCannotLogin(): void
    {
        $this->register();
        static::getContainer()->get(EntityManagerInterface::class)
            ->getConnection()->executeStatement('UPDATE user SET deleted_at = NOW()');

        $this->post('/api/auth/login', ['email' => 'ada@example.com', 'password' => self::PASSWORD]);
        $this->assertResponseStatusCodeSame(401);
    }

    /** @return array{token: string, refresh_token: string} */
    private function login(): array
    {
        $this->register();
        $this->post('/api/auth/login', ['email' => 'ada@example.com', 'password' => self::PASSWORD]);

        return json_decode((string) $this->client->getResponse()->getContent(), true);
    }

    // La connexion renvoie aussi un refresh token, qui donne un nouveau JWT valide
    // Sign-in also returns a refresh token, which yields a new valid JWT
    public function testRefreshReturnsNewToken(): void
    {
        $tokens = $this->login();
        $this->assertNotEmpty($tokens['refresh_token']);

        $this->post('/api/auth/refresh', ['refresh_token' => $tokens['refresh_token']]);
        $this->assertResponseIsSuccessful();
        $new = json_decode((string) $this->client->getResponse()->getContent(), true);

        $this->client->request('GET', '/api/me', server: ['HTTP_AUTHORIZATION' => 'Bearer '.$new['token']]);
        $this->assertResponseIsSuccessful();
    }

    // Un refresh token inconnu est refusé
    // An unknown refresh token is rejected
    public function testRefreshRejectsUnknownToken(): void
    {
        $this->post('/api/auth/refresh', ['refresh_token' => 'does-not-exist']);
        $this->assertResponseStatusCodeSame(401);
    }

    // La déconnexion révoque le refresh token : il ne peut plus servir
    // Sign-out revokes the refresh token: it can no longer be used
    public function testLogoutRevokesRefreshToken(): void
    {
        $tokens = $this->login();

        $this->post('/api/auth/logout', ['refresh_token' => $tokens['refresh_token']]);
        $this->assertResponseStatusCodeSame(204);

        $this->post('/api/auth/refresh', ['refresh_token' => $tokens['refresh_token']]);
        $this->assertResponseStatusCodeSame(401);
    }
}
