<?php

namespace App\Enum;

// Niveau de difficulté d'un jeu / Difficulty level of a game
enum GameDifficulty: string
{
    case Beginner = 'beginner';
    case Intermediate = 'intermediate';
    case Expert = 'expert';
}
