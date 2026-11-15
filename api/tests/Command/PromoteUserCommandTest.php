<?php

declare(strict_types=1);

namespace App\Tests\Command;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Console\Tester\CommandTester;

// Commande app:user:promote (nécessite la base ludmigo_test)
// app:user:promote command (needs the ludmigo_test database)
final class PromoteUserCommandTest extends KernelTestCase
{
    private CommandTester $tester;
    private EntityManagerInterface $em;

    protected function setUp(): void
    {
        $kernel = self::bootKernel();
        $this->em = static::getContainer()->get(EntityManagerInterface::class);
        $this->em->getConnection()->executeStatement('DELETE FROM refresh_token');
        $this->em->getConnection()->executeStatement('DELETE FROM user');
        $this->em->getConnection()->executeStatement(
            "INSERT INTO user (id, email, password, roles, pseudo, created_at) VALUES (UNHEX(REPLACE(UUID(), '-', '')), 'a@example.com', 'x', '[\"ROLE_USER\"]', 'ada', NOW())",
        );
        $this->tester = new CommandTester((new Application($kernel))->find('app:user:promote'));
    }

    /** @return list<string> */
    private function roles(): array
    {
        return json_decode((string) $this->em->getConnection()->fetchOne("SELECT roles FROM user WHERE email = 'a@example.com'"), true);
    }

    // Donne puis retire ROLE_ADMIN
    // Grants then removes ROLE_ADMIN
    public function testGrantAndRemoveRole(): void
    {
        $this->tester->execute(['email' => 'A@example.com']);
        $this->assertSame(0, $this->tester->getStatusCode());
        $this->assertContains('ROLE_ADMIN', $this->roles());

        $this->tester->execute(['email' => 'a@example.com', '--remove' => true]);
        $this->assertNotContains('ROLE_ADMIN', $this->roles());
    }

    // Refuse un rôle inconnu et un email inconnu
    // Rejects an unknown role and an unknown email
    public function testRejectsUnknownRoleAndUser(): void
    {
        $this->tester->execute(['email' => 'a@example.com', 'role' => 'ROLE_ROOT']);
        $this->assertNotSame(0, $this->tester->getStatusCode());

        $this->tester->execute(['email' => 'nobody@example.com']);
        $this->assertNotSame(0, $this->tester->getStatusCode());
    }
}
