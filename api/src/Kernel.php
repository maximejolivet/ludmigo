<?php

namespace App;

use Symfony\Bundle\FrameworkBundle\Kernel\MicroKernelTrait;
use Symfony\Component\HttpKernel\Kernel as BaseKernel;

// Noyau de l'application
// Application kernel
class Kernel extends BaseKernel
{
    use MicroKernelTrait;
}
