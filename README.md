# LofLume

Pet-проект: идея и стек приложения пока не выбраны.

Настроен OpenSpec **1.14.3**, стандартная схема `spec-driven`, базовый профиль
и шесть skills для Codex. Версия и зависимости закреплены в `package.json`
и `pnpm-lock.yaml`. Это инструменты разработки, а не выбор стека приложения.

**Начать:** [пошаговый гайд](docs/WORKFLOW.md), затем рассказать агенту идею.

```sh
./scripts/openspec --version
./scripts/openspec list --json
./scripts/openspec validate --all --strict --no-interactive
```

Для новой машины: Node.js >=20.19.0, pnpm 11.25.0,
затем `pnpm install --frozen-lockfile`. Запускатель также поддерживает Node из Codex.

Правила: [AGENTS.md](AGENTS.md). Настройки: [openspec/config.yaml](openspec/config.yaml).
