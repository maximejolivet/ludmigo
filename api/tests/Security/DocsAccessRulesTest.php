<?php

declare(strict_types=1);

namespace App\Tests\Security;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Yaml\Yaml;

// Règles d'accès de la documentation de l'API : lues dans security.yaml et services.yaml.
// La config de test ouvre la doc (PUBLIC_ACCESS) : ce test protège les expressions régulières et le réglage de production.
// API documentation access rules: read from security.yaml and services.yaml.
// The test config opens the docs (PUBLIC_ACCESS): this test guards the regular expressions and the production setting.
final class DocsAccessRulesTest extends TestCase
{
    /** Premier access_control qui correspond au chemin, comme le fait Symfony / First access_control matching the path, as Symfony does */
    private static function rolesFor(string $path): ?string
    {
        $config = Yaml::parseFile(__DIR__.'/../../config/packages/security.yaml');
        foreach ($config['security']['access_control'] as $rule) {
            if (preg_match('{'.$rule['path'].'}', rawurldecode($path))) {
                return $rule['roles'];
            }
        }

        return null;
    }

    // Ce que le back office lit : point d'entrée, doc Hydra et contextes
    // What the back office reads: entrypoint, Hydra docs and contexts
    #[DataProvider('docsPaths')]
    public function testDocsPathsFollowTheDocsAccessParameter(string $path): void
    {
        $this->assertSame('%app.docs_access%', self::rolesFor($path));
    }

    /** @return iterable<string, array{string}> */
    public static function docsPaths(): iterable
    {
        foreach (['/api', '/api/', '/api/docs.jsonld', '/api/contexts/Entrypoint', '/api/contexts/Game', '/api/contexts/Game.jsonld'] as $path) {
            yield $path => [$path];
        }
    }

    // La page Swagger et les formats OpenAPI suivent un paramètre à part, fermé à tous en production
    // The Swagger page and the OpenAPI formats follow a separate parameter, closed to everyone in production
    #[DataProvider('humanDocsPaths')]
    public function testHumanReadableDocsFollowTheDocsUiParameter(string $path): void
    {
        $this->assertSame('%app.docs_ui_access%', self::rolesFor($path));
    }

    /** @return iterable<string, array{string}> */
    public static function humanDocsPaths(): iterable
    {
        foreach (['/api/docs', '/api/docs/', '/api/docs.html', '/api/docs.jsonopenapi'] as $path) {
            yield $path => [$path];
        }
    }

    #[DataProvider('protectedPaths')]
    public function testOtherPathsRequireAuthentication(string $path): void
    {
        $this->assertSame('IS_AUTHENTICATED_FULLY', self::rolesFor($path));
    }

    /** @return iterable<string, array{string}> */
    public static function protectedPaths(): iterable
    {
        foreach (['/api/games', '/api/games/1', '/api/users', '/api/docsX', '/api/contextsX', '/api/me'] as $path) {
            yield $path => [$path];
        }
    }

    public function testAuthEndpointsStayPublic(): void
    {
        foreach (['/api/health', '/api/auth/login', '/api/auth/register', '/api/auth/refresh', '/api/auth/logout'] as $path) {
            $this->assertSame('PUBLIC_ACCESS', self::rolesFor($path), $path);
        }
    }

    // La doc est fermée par défaut (production, staging) et ouverte seulement en dev et en test
    // The docs are closed by default (production, staging) and open only in dev and test
    public function testDocsAreClosedExceptInDevAndTest(): void
    {
        $services = Yaml::parseFile(__DIR__.'/../../config/services.yaml');

        $this->assertSame('ROLE_ADMIN', $services['parameters']['app.docs_access']);
        $this->assertSame('PUBLIC_ACCESS', $services['when@dev']['parameters']['app.docs_access']);
        $this->assertSame('PUBLIC_ACCESS', $services['when@test']['parameters']['app.docs_access']);
        // Page Swagger et OpenAPI : un rôle que personne n'a, sauf en dev et test
        // Swagger page and OpenAPI: a role nobody has, except in dev and test
        $this->assertSame('ROLE_NOBODY', $services['parameters']['app.docs_ui_access']);
        $this->assertSame('PUBLIC_ACCESS', $services['when@dev']['parameters']['app.docs_ui_access']);
        $this->assertSame('PUBLIC_ACCESS', $services['when@test']['parameters']['app.docs_ui_access']);
        $this->assertArrayNotHasKey('when@prod', $services);
    }
}
