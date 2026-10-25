<?php

// Règles PHP-CS-Fixer (style Symfony) / PHP-CS-Fixer rules (Symfony style)
$finder = (new PhpCsFixer\Finder())
    ->in([__DIR__.'/src', __DIR__.'/tests'])
    ->exclude('var');

return (new PhpCsFixer\Config())
    ->setRules([
        '@Symfony' => true,
        '@PSR12' => true,
    ])
    ->setRiskyAllowed(true)
    ->setFinder($finder);
