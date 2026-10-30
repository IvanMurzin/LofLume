# Proposal

## Why

Владелец хочет открывать LofLume по адресу https://loflume.murzinstudio.com и самостоятельно выбирать момент публикации. Сейчас push в main автоматически обновляет GitHub Pages.

## What Changes

- Хостинг остаётся GitHub Pages; Cloudflare обслуживает DNS поддомена.
- Проверки на push сохраняются, публикация разрешается только после ручного Run workflow для main в GitHub Actions.
- Сборка учитывает корень собственного домена вместо обязательного /LofLume/.
- Документируется подключение домена, HTTPS, порядок переключения и возврат к прежнему адресу.
- Смена origin означает отдельное браузерное хранилище: заметки и настройки со старого адреса автоматически не переносятся; перед переключением владелец может скопировать Markdown вручную.
- Вне scope: GitLab CI, Cloudflare Pages/Workers, проксирование Cloudflare, изменения комнаты и автоматический перенос пользовательских данных.

## Capabilities

### New Capabilities

- `site-publication`: ручная публикация проверенной main-версии на GitHub Pages с собственным HTTPS-поддоменом.

### Modified Capabilities

Нет.

## Impact

.github/workflows/pages.yml, docs/DEPLOYMENT.md и относящиеся к публикации указания AGENTS.md; внешние настройки GitHub Pages и DNS Cloudflare. Новые зависимости и секреты не нужны. Незавершённые floating-panels остаются отдельной работой.
