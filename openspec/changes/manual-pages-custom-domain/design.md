# Design

## Context

См. proposal.md. Единственный pages.yml уже поддерживает push и workflow_dispatch, но deploy не различает эти события. Build принудительно использует /LofLume/. Динамические ресурсы используют BASE_URL через src/assets.ts. На 2026-10-31 владелец сохранил Custom domain в Pages и добавил CNAME. CNAME подтверждена через 1.1.1.1 и 8.8.8.8, NS — Cloudflare; HTTPS пока возвращает несовпадение имени сертификата. Доступ к аккаунту Cloudflare не установлен.

## Goals / Non-Goals

**Goals:** сохранить существующие проверки и SHA закреплённых Actions, отделить публикацию от push и согласовать base сборки с настройкой Pages.

**Non-Goals:** новые CI-провайдеры, сервисы, секреты, автоматический перенос localStorage; изменения незавершённой комнаты.

## Decisions

- Оставить один workflow: push выполняет существующие проверки и сборку; deploy дополнительно требует workflow_dispatch и main. Альтернатива с ручным environment approval ближе к отдельной manual job, но требует настройки защиты окружения; workflow_dispatch даёт простую штатную кнопку.
- Получать base_path из actions/configure-pages перед сборкой и передавать его в Vite. Это позволяет проверить старый /LofLume/ и новый корневой адрес без жёсткой привязки к имени репозитория. Проверить фактическое значение при настройке домена. Не обновлять версии Actions и зависимости.
- Custom domain настраивать в Settings → Pages, source остаётся GitHub Actions. Файл public/CNAME не нужен при этом способе публикации.
- Cloudflare: CNAME `loflume` → `ivanmurzin.github.io`, TTL Auto, DNS only. Поддомен не направлять на /LofLume/ или apex. GitHub Pages обслуживает TLS с Enforce HTTPS; Cloudflare proxy не нужен.
- Сначала доставить workflow с ручным ограничением, затем подключать домен и запускать первую публикацию кнопкой. При доставке изменения push уже должен пропускать deploy.

## Risks / Trade-offs

- [Новый origin] → заранее скопировать заметки вручную; настройки и кассеты при необходимости восстановить. Старые данные не удаляются, но редирект прежнего адреса может затруднить доступ к ним.
- [DNS и сертификат готовы не одновременно] → не объявлять переход завершённым до проверки публичного HTTPS; возможна задержка распространения DNS и выпуска сертификата.
- [Переключение домена раньше нового артефакта] → согласовать настройку и ручной запуск, допустить короткое окно несогласованных путей; zero downtime не обещается.
- [Локальные незавершённые изменения] → не включать floating-panels в checkpoint инфраструктуры и не выдавать их проверки за проверку опубликованной версии.

## Migration Plan

1. Сохранить нужные заметки до настройки редиректа; проверить текущие DNS и настройки Pages. Установить, делегирован ли murzinstudio.com в Cloudflare; перенос всей зоны автоматически не выполнять.
2. Проверить workflow и сборку с /LofLume/ и /; доставить только согласованный инфраструктурный checkpoint в main после разрешения владельца.
3. По возможности подтвердить владение доменом в GitHub Pages через выданную GitHub TXT-запись. Добавить Custom domain в репозитории до создания CNAME.
4. Создать/проверить только CNAME поддомена в Cloudflare, не меняя записи основного сайта и почты. Дождаться DNS и сертификата, включить Enforce HTTPS.
5. Нажать Run workflow для main, проверить факт успешного deploy, HTTPS, загрузку ресурсов, радио, кассеты, заметки и таймер. Отдельно подтвердить отсутствие deploy при push.
6. Откат: убрать Custom domain и только созданную CNAME поддомена; вручную пересобрать и опубликовать с base_path старого Pages-адреса. Автоматическую публикацию на push при откате не возвращать.

Источники: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site ; https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow ; https://developers.cloudflare.com/dns/proxy-status/
