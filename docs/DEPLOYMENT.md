# GitHub Pages

Целевой адрес: https://loflume.murzinstudio.com/
Прежний адрес: https://ivanmurzin.github.io/LofLume/

## Публикация

- Workflow: `.github/workflows/pages.yml`, **Check and manually deploy GitHub Pages**.
- Push кода, материалов, тестов, сборочных файлов или workflow в `main` запускает проверки и сборку **без публикации**. Документация и AGENTS.md сами по себе запуск не вызывают.
- Публикация: [Actions](https://github.com/IvanMurzin/LofLume/actions) → **Check and manually deploy GitHub Pages → Run workflow → main → Run workflow**.
- Ручной запуск публикует main на момент запуска, после проверок: типы → тесты → OpenSpec → build. При ошибке новая версия не публикуется. Другая ветка не публикуется.
- Публикация использует артефакт сборки того же запуска, а не изменившуюся впоследствии main.
- Задачи идут последовательно, без прерывания начатого запуска.
- Сборка получает `base_path` из настройки GitHub Pages: `/` для своего домена, `/LofLume/` для стандартного адреса проекта. Переименование репозитория не требует ручного изменения этого пути.
- Версии Actions закреплены commit SHA; Node 24, pnpm из packageManager, зависимости по lockfile.
- Дополнительные токены и секреты не нужны: используются GITHUB_TOKEN и OIDC. Build читает Pages; только ручной deploy получает `pages: write` и `id-token: write`.
- Небольшие продуктовые правки накапливаются в осмысленные checkpoint; push и публикация теперь являются отдельными действиями.

## Подключение поддомена

Перед переключением скопировать нужный Markdown из блокнота со старого адреса. Заметки, кассеты и настройки хранятся в браузере отдельно для каждого origin и автоматически не перенесутся. Смена домена не удаляет старые данные, но старый адрес может начать перенаправлять на новый.

1. Сначала доставить workflow с ручным ограничением в `main` и проверить, что при push job `deploy` пропущен.
2. В [Settings → Pages](https://github.com/IvanMurzin/LofLume/settings/pages) оставить **Source: GitHub Actions**. По возможности предварительно подтвердить владение доменом в настройках Pages аккаунта с помощью выданной GitHub TXT-записи.
3. В Pages репозитория установить **Custom domain: loflume.murzinstudio.com** и нажать **Save** до создания DNS-записи. Файл `public/CNAME` для GitHub Actions не нужен.
4. В Cloudflare → murzinstudio.com → DNS → Records добавить:

   | Поле | Значение |
   |---|---|
   | Type | CNAME |
   | Name | loflume |
   | Target | ivanmurzin.github.io |
   | Proxy status | DNS only (серое облако) |
   | TTL | Auto |

   Target не содержит протокол или `/LofLume/`. Не менять записи основного сайта и почты. Если домен ещё не использует NS Cloudflare, согласовать перенос зоны отдельно.
5. Проверить `dig +short CNAME loflume.murzinstudio.com`: ожидается `ivanmurzin.github.io.`. В GitHub нажать **Check again**. Распространение DNS может занять до 24 часов; HTTPS после корректной настройки — до часа. Пока сертификат не готов, Enforce HTTPS может быть недоступен.
6. После успешной проверки и выпуска сертификата включить **Enforce HTTPS**, затем запустить ручную публикацию `main`.
7. Проверить публичный HTTPS и ресурсы по инструкции ниже. Между сменой домена и публикацией новой сборки возможен короткий период неверных путей ресурсов.

### Если GitHub пишет InvalidDNSError

Проверить CNAME и NS через `dig`, отсутствие опечаток и режим DNS only. Если CNAME уже видна, повторить **Check again** после обновления DNS. Если DNS корректен, а сертификат продолжительно не выпускается, проверить CAA (для GitHub Pages нужен допуск letsencrypt.org при наличии ограничивающих CAA); GitHub также рекомендует удалить и добавить Custom domain повторно для перезапуска выпуска сертификата. Не выполнять это автоматически при первой ошибке.

## Локальная проверка адресов

```sh
pnpm typecheck
pnpm test
pnpm spec:validate
pnpm build --base /
pnpm preview --base / --port 4173 --strictPort
```

Открыть http://127.0.0.1:4173/. Для проверки стандартного адреса остановить preview, собрать `pnpm build --base /LofLume/` и запустить `pnpm preview --base /LofLume/ --port 4173 --strictPort`; открыть http://127.0.0.1:4173/LofLume/. Сборка и preview используют одинаковый base.

Vite переписывает HTML и CSS. Динамические ссылки на фон и музыку проходят через `src/assets.ts` и `import.meta.env.BASE_URL`, включая повторную загрузку картинки после ошибки. Не добавлять динамические пути `/audio/...` и `/assets/...` без помощника.

Обычный `pnpm dev` работает в корне http://127.0.0.1:5173/.

## Проверка после публикации

Проверить успешный ручной run и пропущенный deploy в предыдущем push-run. Открыть публичный HTTPS-адрес; проверить картинку, шрифты и логотип, запуск радио только кнопкой «Включить», переход треков, кассеты, блокнот, часы и короткую сессию с завершением, лампу и восстановление настроек после reload без автозапуска. Не выдавать недоступные проверки подписного воспроизведения и отдельных браузеров за пройденные.

## Откат домена

Убрать Custom domain в Settings → Pages и только созданную CNAME поддомена в Cloudflare. Вручную запустить workflow для main: он получит путь стандартного Pages-адреса, соберёт и опубликует сайт на https://ivanmurzin.github.io/LofLume/. Проверить загрузку ресурсов. Ручной режим публикации сохраняется.

Источники: [собственный домен GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [диагностика домена и HTTPS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages), [ручной workflow](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow), [DNS only в Cloudflare](https://developers.cloudflare.com/dns/proxy-status/).
