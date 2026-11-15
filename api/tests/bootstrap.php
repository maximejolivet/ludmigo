<?php

declare(strict_types=1);

// Charge l'environnement de test avant d'exécuter la suite
// Loads the test environment before running the suite
use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__).'/vendor/autoload.php';

(new Dotenv())->bootEnv(dirname(__DIR__).'/.env');

// Génère une paire de clés JWT jetable pour les tests si elle n'existe pas
// Generates a throwaway JWT key pair for the tests if it does not exist
$jwtDir = dirname(__DIR__).'/var/jwt-test';
if (!is_file($jwtDir.'/private.pem')) {
    @mkdir($jwtDir, 0o700, true);
    $key = openssl_pkey_new(['private_key_bits' => 2048, 'private_key_type' => OPENSSL_KEYTYPE_RSA]);
    openssl_pkey_export($key, $privateKey, 'test-passphrase');
    file_put_contents($jwtDir.'/private.pem', $privateKey);
    file_put_contents($jwtDir.'/public.pem', openssl_pkey_get_details($key)['key']);
}
