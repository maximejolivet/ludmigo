# Politique de sécurité

## Versions prises en charge

Seule la dernière version de la branche `develop` et la dernière version de production reçoivent les correctifs de sécurité. Les anciennes versions ne sont plus maintenues.

| Version | Prise en charge |
| --- | --- |
| Dernière version de production | Oui |
| `develop` (dernière version) | Oui |
| Anciennes versions | Non |

## Signaler une vulnérabilité

**N'ouvrez pas de ticket public, de Pull Request ni de discussion pour un problème de sécurité.**

Signalez-le de façon privée par l'un de ces canaux :

- le signalement privé de vulnérabilités de GitHub (bouton « Report a vulnerability » dans l'onglet Security du dépôt), **[À CONFIRMER : activé sur le dépôt]**
- par email : **[À CONFIRMER : adresse de contact sécurité, par ex. security@ludmigo.fr]**

Merci d'inclure :

- une description du problème et de son impact potentiel ;
- les étapes pour le reproduire (URL, requête, écran ou chemin dans le code) ;
- la version ou le commit concerné, si vous les connaissez ;
- une preuve de concept, limitée au minimum nécessaire pour démontrer le problème.

## Délais

- **Accusé de réception** : dans les 72 heures suivant votre signalement **[À CONFIRMER : délai]**.
- **Qualification** : une première évaluation (gravité, périmètre, étapes suivantes) dans les 7 jours **[À CONFIRMER : délai]**.
- **Correctif et publication** : nous corrigeons en priorité les problèmes confirmés et nous convenons avec vous de la date de publication. Nous citons les personnes qui le souhaitent.

## Périmètre

Dans le périmètre :

- l'API (`api/`), y compris l'authentification, les autorisations et le traitement des données personnelles ;
- l'application web (`web/`) et l'application mobile (`mobile/`) ;
- la configuration de déploiement de ce dépôt (`docker/`, `k8s/`, `docker-compose.yml`).

Hors périmètre :

- les tests de déni de service et de charge contre la production ;
- l'ingénierie sociale auprès du personnel ou des utilisateurs ;
- les problèmes qui nécessitent un accès physique à un appareil déverrouillé ;
- les rapports fondés uniquement sur la sortie d'un scanner automatique, sans impact démontré.

## Règles pour les chercheurs

- Ne testez qu'avec vos propres comptes et données. N'accédez pas, ne modifiez pas et ne supprimez pas les données d'autres utilisateurs.
- Arrêtez dès que le problème est démontré, et ne conservez pas de copie des données personnelles.
- Ne divulguez pas publiquement le problème avant que nous ayons confirmé un correctif ou convenu d'une date.

## Secrets

Les identifiants, clés d'API et mots de passe ne doivent jamais être committés. Si vous en trouvez dans le dépôt ou son historique, signalez-le immédiatement par les canaux ci-dessus. Considérez-le comme compromis et ne l'utilisez pas.

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# Security Policy

## Supported versions

Only the latest version on the `develop` branch and the latest production release receive security fixes. Older versions are not maintained.

| Version | Supported |
| --- | --- |
| Latest production release | Yes |
| `develop` (latest) | Yes |
| Older releases | No |

## Reporting a vulnerability

**Do not open a public issue, pull request or discussion for a security problem.**

Report it privately through one of these channels:

- GitHub private vulnerability reporting (the "Report a vulnerability" button in the Security tab of the repository), **[TO CONFIRM: enabled on the repository]**
- Email: **[TO CONFIRM: security contact address, e.g. security@ludmigo.fr]**

Please include:

- a description of the problem and its potential impact;
- the steps to reproduce it (URL, request, screen, or code path);
- the affected version or commit, if known;
- any proof of concept, kept to the minimum needed to demonstrate the issue.

## What to expect

- **Acknowledgement**: within 72 hours of your report **[TO CONFIRM: delay]**.
- **Triage**: a first assessment (severity, scope, next steps) within 7 days **[TO CONFIRM: delay]**.
- **Fix and disclosure**: we fix confirmed issues as a priority and coordinate the publication date with you. We credit reporters who wish to be named.

## Scope

In scope:

- the API (`api/`), including authentication, authorisation and personal data handling;
- the web application (`web/`) and the mobile application (`mobile/`);
- the deployment configuration in this repository (`docker/`, `k8s/`, `docker-compose.yml`).

Out of scope:

- denial-of-service tests and load tests against production;
- social engineering of staff or users;
- findings that require physical access to an unlocked device;
- reports based only on automated scanner output without a demonstrated impact.

## Rules for researchers

- Only test against your own accounts and data. Do not access, modify or delete other users' data.
- Stop as soon as you have demonstrated the issue, and do not keep copies of personal data.
- Do not disclose the issue publicly until we have confirmed a fix or agreed on a date.

## Secrets

Credentials, API keys and passwords must never be committed. If you find one in the repository or its history, report it immediately using the channels above. Treat it as compromised and do not use it.
