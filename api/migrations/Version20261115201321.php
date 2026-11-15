<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20261115201321 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add an index on game.created_at for the default ordering';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE INDEX idx_game_created_at ON game (created_at)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP INDEX idx_game_created_at ON game');
    }
}
