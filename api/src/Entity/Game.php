<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Enum\GameDifficulty;
use App\Repository\GameRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

// Jeu de société du catalogue (voir docs/05_BACKEND_SCHEMA.md), géré par les administrateurs
// Board game of the catalogue (see docs/05_BACKEND_SCHEMA.md), managed by administrators
#[ApiResource(
    operations: [new GetCollection(), new Get(), new Post(), new Put(), new Patch(), new Delete()],
    normalizationContext: ['groups' => ['game:read']],
    denormalizationContext: ['groups' => ['game:write']],
    security: "is_granted('ROLE_ADMIN')",
)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial', 'difficulty' => 'exact'])]
#[ApiFilter(OrderFilter::class, properties: ['name', 'createdAt'])]
#[ORM\Entity(repositoryClass: GameRepository::class)]
#[ORM\Table(name: 'game')]
#[ORM\Index(columns: ['name'], name: 'idx_game_name')]
#[ORM\Index(columns: ['created_at'], name: 'idx_game_created_at')]
class Game
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[Groups(['game:read'])]
    private Uuid $id;

    #[ORM\Column(length: 180)]
    #[Groups(['game:read', 'game:write'])]
    #[Assert\NotBlank]
    #[Assert\Length(max: 180)]
    private string $name = '';

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['game:read', 'game:write'])]
    #[Assert\Length(max: 5000)]
    private ?string $description = null;

    #[ORM\Column(type: Types::SMALLINT)]
    #[Groups(['game:read', 'game:write'])]
    #[Assert\Positive]
    #[Assert\LessThanOrEqual(32767)]
    private int $minPlayers = 1;

    #[ORM\Column(type: Types::SMALLINT)]
    #[Groups(['game:read', 'game:write'])]
    #[Assert\Positive]
    #[Assert\GreaterThanOrEqual(propertyPath: 'minPlayers')]
    #[Assert\LessThanOrEqual(32767)]
    private int $maxPlayers = 1;

    #[ORM\Column(type: Types::SMALLINT, nullable: true)]
    #[Groups(['game:read', 'game:write'])]
    #[Assert\Positive]
    #[Assert\LessThanOrEqual(32767)]
    private ?int $durationMinutes = null;

    #[ORM\Column(length: 20, enumType: GameDifficulty::class)]
    #[Groups(['game:read', 'game:write'])]
    private GameDifficulty $difficulty = GameDifficulty::Beginner;

    #[ORM\Column(nullable: true)]
    #[Groups(['game:read', 'game:write'])]
    #[Assert\Length(max: 255)]
    #[Assert\Url(requireTld: false)]
    private ?string $imageUrl = null;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    #[Groups(['game:read'])]
    private \DateTimeImmutable $createdAt;

    public function __construct()
    {
        $this->id = Uuid::v7();
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): Uuid
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getMinPlayers(): int
    {
        return $this->minPlayers;
    }

    public function setMinPlayers(int $minPlayers): static
    {
        $this->minPlayers = $minPlayers;

        return $this;
    }

    public function getMaxPlayers(): int
    {
        return $this->maxPlayers;
    }

    public function setMaxPlayers(int $maxPlayers): static
    {
        $this->maxPlayers = $maxPlayers;

        return $this;
    }

    public function getDurationMinutes(): ?int
    {
        return $this->durationMinutes;
    }

    public function setDurationMinutes(?int $durationMinutes): static
    {
        $this->durationMinutes = $durationMinutes;

        return $this;
    }

    public function getDifficulty(): GameDifficulty
    {
        return $this->difficulty;
    }

    public function setDifficulty(GameDifficulty $difficulty): static
    {
        $this->difficulty = $difficulty;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(?string $imageUrl): static
    {
        $this->imageUrl = $imageUrl;

        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }
}
