# LofLume — working agreement

## Collaboration
- LofLume is a desktop-first lo-fi web room for coding. The approved first version is one cozy home room, an original woman at a computer, no rain or ambience, curated free music, a focus timer and a lamp. See the active cozy-coding-room change for scope; stop for product acceptance after each of its five stages.
- Discuss behavior, scope, and meaningful tradeoffs in Russian. Own implementation, debugging, and verification; do not require the user to review code.
- Ask about ambiguities that materially affect behavior, cost, data, or acceptance. Make routine technical choices autonomously; record consequential decisions in the active change's design.
- Keep updates concise: what works, what was checked, and remaining limitations.

## OpenSpec
- Use the installed skills for new capabilities, significant behavior changes, and architectural changes. Keep the standard `spec-driven` schema and artifacts proportional to scope.
- Propose first, present a short product summary, then apply when the user asks to proceed. During authorized implementation, finish agreed work and checks without approval at every task.
- Small fixes restoring specified behavior, copy edits, and formatting can proceed directly. Update specs when requirements change; do not create a change for every edit.
- Start with `./scripts/openspec list --json`. Read only the active change, affected specs, and relevant code, not every skill, archive, or document.
- Run CLI examples from skills through `./scripts/openspec <arguments>`; no global CLI is installed. The wrapper uses the pinned local dependency and disables telemetry for its process.
- Current requirements live in `openspec/specs/`, proposed work in `openspec/changes/`, artifact context/rules in `openspec/config.yaml`. Avoid duplicate plans and status logs.
- Complete task checkboxes only after implementation and relevant verification. Compare behavior with acceptance scenarios and validate specs before closing. Sync and archive through the installed workflow when requested; preserve its required prompts.
- Generated `.agents/skills/openspec-*` files belong to OpenSpec. Customize project guidance rather than editing generated skills; refresh them through the pinned CLI after an intentional upgrade.

## Models and budget
- One agent by default. No automatic reviewer/QA teams, background loops, or separate chats for routine work.
- Preferred routing: GPT-6.1 Sol / medium for implementation; GPT-6.1 Sol / high for architecture, ambiguity, difficult bugs, or migrations; GPT-6 Luna / low or medium for small, well-scoped and mechanical tasks.
- Do not assign architecture or ambiguous debugging to a lightweight model solely for cost. Astra and xhigh/max require an explicit user request for that task. Preserve an explicit user model choice.
- Routing is guidance, not an automatic switch: the current chat model is selected in the app. Never claim to have changed it. Suggest switching only when the benefit justifies interrupting work.
- Delegate only when explicitly requested. Start with at most one bounded subtask, a suitable available model/effort, and necessary context. Otherwise work in this chat.
- Prefer deterministic tools and focused checks to repeated model reviews. Do not repeat passing checks without a new reason.

## Implementation
- Choose a familiar, supported stack after product scope is known. Prefer one deployable application and few dependencies. Add services, layers, and abstractions only for demonstrated needs.
- Keep responsibilities clear, follow established patterns, validate external input, handle expected failures, and keep secrets out of source and logs.
- Deliver small, runnable scenarios. Check changed behavior and important failure cases; add useful regression checks for bugs. Run and inspect UI changes when browser tooling is available.
- Use actual build, type, lint, and test commands once they exist, and add them here when the stack is selected. OpenSpec validation is not application testing.
- Before completion, inspect the diff when Git exists, run relevant available checks, and report unverified behavior. Avoid tests that merely mirror implementation or test documentation wording.
- Keep lockfiles and do not silently upgrade dependencies. The user authorizes commits and pushes only for meaningful completed blocks or product stages. Accumulate small feedback fixes locally; do not commit or push after each small request. Push to origin/main once a coherent verified checkpoint is ready (or when explicitly requested). Never force-push, rewrite existing commits or overwrite unrelated changes. A main push may publish GitHub Pages, so avoid repeated pushes for intermediate fixes.

## Current tooling
- Node.js >=22.12; pnpm 11.25.0. Restore: `pnpm install --frozen-lockfile`.
- CLI: `./scripts/openspec`; status: `pnpm spec:list`; validation: `pnpm spec:validate`.
- User guide and source references: `docs/WORKFLOW.md` (read for onboarding, not before every edit).
- Application: React + TypeScript, plain CSS, Vite. Keep visual styling in the existing CSS; no UI kit is needed. Run `pnpm dev`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm preview`. `scripts/app` supports the bundled Codex Node runtime when node is absent from PATH.
- Stages 1–2 are accepted: user-selected scene, timed handwritten discovery and silhouette hover. The current v5 artwork has a lidded coffee cup, so steam has been removed; keep the clock colon animation. Stage 3 adds local CC0 music through the radio; the user explicitly authorized stage 4 clocks, now implemented; lamp is implemented, product acceptance remains.
- Current scene: user-provided `public/assets/cozy-coding-v5.webp`; source and provenance in `docs/assets/cozy-coding-v5.md`. Future object ideas live in `docs/IDEAS.md`; do not implement them merely because they are pictured.
- React components live in `src/App.tsx` and `src/SceneArtwork.tsx`; `useRoom` and `useMusic` own browser subscriptions with cleanup. Keep `src/music.ts` independent of React. Compare browser screenshots when changing the render tree.
- `pnpm test` runs focused music and timer state/failure regression tests with Node type stripping. No lint command exists. Do browser QA for visual changes.
