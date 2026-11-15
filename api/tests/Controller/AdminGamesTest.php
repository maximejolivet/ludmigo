<?php

namespace App\Tests\Controller;

use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\Attributes\DataProvider;
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

    /** @return array<string, mixed> */
    private function json(): array
    {
        return json_decode((string) $this->client->getResponse()->getContent(), true, flags: \JSON_THROW_ON_ERROR);
    }

    // Crée un jeu et renvoie son IRI / Creates a game and returns its IRI
    /** @param array<string, mixed> $extra */
    private function createGame(string $token, string $name, array $extra = []): string
    {
        $this->call('POST', '/api/games', $token, array_merge(['name' => $name, 'minPlayers' => 2, 'maxPlayers' => 4], $extra));
        $this->assertResponseStatusCodeSame(201);

        return $this->json()['@id'];
    }

    /** @return list<string> */
    private function names(): array
    {
        $data = $this->json();

        return array_column($data['member'] ?? $data['hydra:member'], 'name');
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

    // Un administrateur crée, lit, modifie (PATCH puis PUT) et supprime un jeu
    // An administrator creates, reads, updates (PATCH then PUT) and deletes a game
    public function testAdminManagesGames(): void
    {
        $token = $this->tokenFor('boss@example.com', 'boss', true);
        $iri = $this->createGame($token, 'Catan', ['minPlayers' => 3, 'durationMinutes' => 90, 'difficulty' => 'intermediate']);

        $this->call('GET', $iri, $token);
        $this->assertResponseIsSuccessful();
        $this->assertSame('Catan', $this->json()['name']);

        $this->call('PATCH', $iri, $token, ['maxPlayers' => 6]);
        $this->assertResponseIsSuccessful();
        $this->assertSame(6, $this->json()['maxPlayers']);

        $this->call('PUT', $iri, $token, ['name' => 'Catane', 'minPlayers' => 3, 'maxPlayers' => 5, 'difficulty' => 'expert']);
        $this->assertResponseIsSuccessful();
        $this->assertSame('Catane', $this->json()['name']);
        $this->assertSame('expert', $this->json()['difficulty']);

        $this->call('DELETE', $iri, $token);
        $this->assertResponseStatusCodeSame(204);

        // Le jeu supprimé n'existe plus / The deleted game is gone
        $this->call('GET', $iri, $token);
        $this->assertResponseStatusCodeSame(404);
    }

    // Les corps invalides sont refusés avec 422 (validation) ou 400 (type invalide), jamais 500
    // Invalid bodies are rejected with 422 (validation) or 400 (invalid type), never 500
    /** @param array<string, mixed> $body */
    #[DataProvider('invalidPayloads')]
    public function testInvalidPayloadsAreRejected(array $body, int $status): void
    {
        $token = $this->tokenFor('boss@example.com', 'boss', true);

        $this->call('POST', '/api/games', $token, $body + ['name' => 'Catan', 'minPlayers' => 2, 'maxPlayers' => 4]);
        $this->assertResponseStatusCodeSame($status);
    }

    /** @return iterable<string, array{array<string, mixed>, int}> */
    public static function invalidPayloads(): iterable
    {
        yield 'empty name' => [['name' => ''], 422];
        yield 'name too long' => [['name' => str_repeat('a', 181)], 422];
        yield 'min players zero' => [['minPlayers' => 0, 'maxPlayers' => 4], 422];
        yield 'max below min' => [['minPlayers' => 4, 'maxPlayers' => 2], 422];
        yield 'max out of SMALLINT range' => [['maxPlayers' => 40000], 422];
        yield 'duration zero' => [['durationMinutes' => 0], 422];
        yield 'duration out of range' => [['durationMinutes' => 40000], 422];
        yield 'invalid image url' => [['imageUrl' => 'pas-une-url'], 422];
        yield 'image url too long' => [['imageUrl' => 'https://example.com/'.str_repeat('a', 250)], 422];
        yield 'javascript image url' => [['imageUrl' => 'javascript:alert(1)'], 422];
        yield 'description too long' => [['description' => str_repeat('a', 5001)], 422];
        yield 'unknown difficulty' => [['difficulty' => 'impossible'], 400];
        yield 'decimal players' => [['minPlayers' => 2.5], 400];
    }

    // Un PATCH ne peut pas rendre le maximum inférieur au minimum déjà enregistré
    // A PATCH cannot make the maximum lower than the stored minimum
    public function testPatchBelowStoredMinPlayersIsRejected(): void
    {
        $token = $this->tokenFor('boss@example.com', 'boss', true);
        $iri = $this->createGame($token, 'Catan', ['minPlayers' => 3, 'maxPlayers' => 4]);

        $this->call('PATCH', $iri, $token, ['maxPlayers' => 2]);
        $this->assertResponseStatusCodeSame(422);
    }

    // Recherche par nom, filtre de difficulté et tri
    // Search by name, difficulty filter and ordering
    public function testFilterAndOrder(): void
    {
        $token = $this->tokenFor('boss@example.com', 'boss', true);
        $this->createGame($token, 'Catan', ['difficulty' => 'intermediate']);
        $this->createGame($token, 'Azul', ['difficulty' => 'beginner']);
        $this->createGame($token, 'Terraforming Mars', ['difficulty' => 'expert']);

        $this->call('GET', '/api/games?name=cat', $token);
        $this->assertSame(['Catan'], $this->names());

        $this->call('GET', '/api/games?difficulty=expert', $token);
        $this->assertSame(['Terraforming Mars'], $this->names());

        $this->call('GET', '/api/games?order[name]=asc', $token);
        $this->assertSame(['Azul', 'Catan', 'Terraforming Mars'], $this->names());

        $this->call('GET', '/api/games?order[name]=desc', $token);
        $this->assertSame(['Terraforming Mars', 'Catan', 'Azul'], $this->names());
    }

    // Le client choisit la taille de page (itemsPerPage), le total reste celui de la liste
    // The client chooses the page size (itemsPerPage), the total stays the list total
    public function testClientPageSizeIsHonoured(): void
    {
        $token = $this->tokenFor('boss@example.com', 'boss', true);
        foreach (['Azul', 'Catan', 'Dixit'] as $name) {
            $this->createGame($token, $name);
        }

        $this->call('GET', '/api/games?itemsPerPage=2&page=1&order[name]=asc', $token);
        $this->assertSame(['Azul', 'Catan'], $this->names());
        $this->assertSame(3, $this->json()['totalItems']);

        $this->call('GET', '/api/games?itemsPerPage=2&page=2&order[name]=asc', $token);
        $this->assertSame(['Dixit'], $this->names());
    }
}
