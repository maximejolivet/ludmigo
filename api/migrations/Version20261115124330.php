<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20261115124330 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create the game table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE game (id BINARY(16) NOT NULL, name VARCHAR(180) NOT NULL, description LONGTEXT DEFAULT NULL, min_players SMALLINT NOT NULL, max_players SMALLINT NOT NULL, duration_minutes SMALLINT DEFAULT NULL, difficulty VARCHAR(20) NOT NULL, image_url VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, INDEX idx_game_name (name), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE game');
    }
}
