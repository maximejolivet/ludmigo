<?php

namespace App\Command;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

// Attribue ou retire un rôle à la main : ROLE_ADMIN n'est jamais donné à l'inscription
// Grants or removes a role by hand: ROLE_ADMIN is never given at sign-up
#[AsCommand(name: 'app:user:promote', description: 'Grant (or remove with --remove) a role to a user, by email')]
final class PromoteUserCommand extends Command
{
    private const ROLES = ['ROLE_PLACE', 'ROLE_ADMIN'];

    public function __construct(
        private readonly UserRepository $users,
        private readonly EntityManagerInterface $em,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('email', InputArgument::REQUIRED, 'Email of the user')
            ->addArgument('role', InputArgument::OPTIONAL, 'ROLE_ADMIN or ROLE_PLACE', 'ROLE_ADMIN')
            ->addOption('remove', null, InputOption::VALUE_NONE, 'Remove the role instead of granting it');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $role = strtoupper((string) $input->getArgument('role'));

        if (!\in_array($role, self::ROLES, true)) {
            $io->error(\sprintf('Unknown role "%s". Allowed: %s.', $role, implode(', ', self::ROLES)));

            return Command::INVALID;
        }

        $user = $this->users->findOneBy(['email' => mb_strtolower((string) $input->getArgument('email'))]);
        if (null === $user) {
            $io->error('No user with this email.');

            return Command::FAILURE;
        }

        $roles = array_diff($user->getRoles(), ['ROLE_USER', $role]);
        if (!$input->getOption('remove')) {
            $roles[] = $role;
        }
        $user->setRoles(array_values($roles));
        $this->em->flush();

        $io->success(\sprintf('%s: %s', $user->getPseudo(), implode(', ', $user->getRoles())));

        return Command::SUCCESS;
    }
}
