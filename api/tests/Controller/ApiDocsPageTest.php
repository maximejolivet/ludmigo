<?php

declare(strict_types=1);

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

// Page de documentation de l'API (Swagger UI) : le modèle Ludmigo remplace celui d'API Platform
// API documentation page (Swagger UI): the Ludmigo template replaces the API Platform one
final class ApiDocsPageTest extends WebTestCase
{
    public function testDocsPageUsesTheLudmigoTemplate(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/docs', server: ['HTTP_ACCEPT' => 'text/html']);

        $this->assertResponseIsSuccessful();
        $html = (string) $client->getResponse()->getContent();
        $this->assertStringContainsString('<title>Ludmigo API - Documentation</title>', $html);
        $this->assertStringContainsString('ludmigo-header', $html);
        $this->assertStringContainsString('/ui/style.css', $html);
        // Pas de mascotte, et la balise <header> d'API Platform n'est pas utilisée
        // No mascot, and the API Platform <header> tag is not used
        $this->assertStringNotContainsString('class="webby', $html);
        $this->assertStringNotContainsString('<header', $html);
    }

    // Les ressources de la page existent (feuille de style, script, polices, logos)
    // The page assets exist (stylesheet, script, fonts, logos)
    public function testPageAssetsExist(): void
    {
        foreach (['style.css', 'night.js', 'logo-noir.svg', 'logo-blanc.svg', 'fonts/fira-sans-latin-400-normal.woff2', 'fonts/fira-sans-latin-700-normal.woff2'] as $file) {
            $this->assertFileExists(__DIR__.'/../../public/ui/'.$file);
        }
    }
}
