# dsh-prompt-rewriter

English | [中文](README.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This is **langkeshuo-ai's customized fork**, based on upstream v1.9.0. It keeps the orange Claude starburst and adds fixes for attachment writes, stuck requests, error records and settings links.

- **Current mainline**: [main](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/tree/main), containing the complete customization and repository documentation.
- **Repository chronology**: [TIMELINE.md](TIMELINE.md), separating inherited upstream history from the custom commits and GitHub repository creation.
- **Version and installation notes**: [VERSIONING.md](VERSIONING.md). The mainline retains upstream version `1.9.1-dev.1`; older custom branches report `1.9.0`. Use the source and full commit hash to identify a build.
- The npm package and inherited marketplace badges refer to upstream. Install this fork from the repository and branch shown below.

Turns the half-formed draft in your composer into a task instruction you can actually run.
**It rewrites the box, it never sends.** Don't like it? `Ctrl+Z` and you're back.

> An unofficial community project, not affiliated with or endorsed by DeepSeek. Artwork attribution is in [NOTICE.md](NOTICE.md).

---

> The figures below are inherited upstream demonstrations, not new screenshots of this fork. The customized icon and settings differ as described here.

![Upstream demonstration: click the whale-tail icon on the right of the composer and the draft becomes a complete prompt in place](https://cdn.jsdelivr.net/npm/dsh-prompt-rewriter/docs/images/01-hero-en.gif)

## What it fills in for you

A one-line draft is missing **goal, format, and boundaries**. The model can only guess — guess wrong and you spend another round rewording. This button puts those three things back into the sentence you already wrote:

| What changed | Your draft | What goes back in the box |
|---|---|---|
| Original wording | *help me write a scraper for Douban movies* | the same sentence |
| Goal added | | scrape **Top 250** titles, **ratings and links** |
| Format added | | output a **CSV file** |
| Boundaries added | | respect robots.txt, **wait at least 2s between requests**, back off on rate limits **instead of circumventing them** |

The third column is not something you wrote. It read your sentence and filled it in. **And it stays editable** — it lands in the composer, not somewhere else.

Two more points worth stating: **the rewrite never contains a question back** (if the model slips one into the rewrite, the question is dropped and the rewrite kept; if the whole reply is a question, it re-runs on the legacy rules and otherwise keeps your draft); and **the rule set is switchable** (Legacy / Intent-first / WorkBuddy, changed in settings, with the button and the steps unchanged).

## How to use it

1. Type any draft in the composer — shorter is fine.
2. Click the **orange Claude starburst** in the right-hand control group of the composer (a small blue dot means it will use conversation context). It shares that group with the model picker and send button, and other plugins may add controls between them. It isn't there when the box is empty.
3. A moment later — how long depends on the chosen model — the draft is replaced with the rewritten prompt.
4. Not what you wanted? `Ctrl+Z`, or click the undo arrow the button turned into.

Changed your mind mid-flight? Click again to cancel. The draft stays exactly as it was — no half-finished text left behind.

How hard it rewrites is the *Enhancement rule set* in settings: **Legacy** (default) behaves like 1.7.1, **Intent-first** fills in more, **WorkBuddy** uses its original prompt. Switching rules changes neither the button nor the steps.

### For faster results, pick a stable model

An enhancement is a real model call, and **how fast the result comes back depends mostly on the model you have selected**.

If it feels slow, switch the session to a model that is more stable and responds faster — the same draft can take a few seconds on one model and well over ten on another. The button does not favour any particular model; it uses whichever one you picked.

> Want a fixed model just for enhancement, without affecting normal chat? Open `Settings → Prompt Enhance` and turn on **Use a fixed model**.

### You can navigate away mid-rewrite

Once you've clicked, you don't have to sit and wait. **Switch to another session and the task keeps running.**

Come back and the result is already in the composer; if it hasn't finished, the button is still the spinning tail. Two sessions can each run their own rewrite without interfering.

### When the composer has attachments or links

Attachments and links are things you already said — the rewrite only touches the sentence beside them.

- Attachment references and link chips stay in place when the rewritten text lands in the composer.
- Undo restores only the words you typed; your attachments are not swept away with it.
- **Attachment content** is read only while *Reference attachment content* is on: at most 2 non-image attachments of 5 MiB each, and text-like files contribute the first 6,000 characters. With it off, only up to 8 file names are used as context.
- What goes into the prompt is the **readable file name**, not the full `@D:\...` path, and a link keeps only its host name. Your local directory layout never travels with the prompt.

### Keyboard shortcut (off by default)

Turn it on at **Settings → Prompt Enhance → Shortcut**. Desktop uses `Ctrl+E` (`Cmd+E` on macOS); the browser uses `Ctrl+Alt+E` (`Cmd+Alt+E`).

- Press once to enhance; press again while it runs to pause. It acts on the composer of the current conversation.
- **Same as clicking the icon** — the shortcut runs the icon's own click handler, including its undo state, so the two paths cannot drift. Restoring a draft stays on the button or `Ctrl+Z`.
- Click the shown combination to record your own; `Esc` cancels. **Reset** restores the default in one click.
- Already taken by another command? The row names the command it collides with, the combination is not applied, and your previous binding stays.
- Registered through Harness's shortcut service, so it persists across restarts.

### The four button states

![Button states: idle, rewriting, done and undoable, failed and retryable](https://cdn.jsdelivr.net/npm/dsh-prompt-rewriter/docs/images/02-button-states-en.gif)

| State | What you see | What it means |
|---|---|---|
| Idle | orange Claude starburst | ready to click |
| Rewriting | animation in the same button | running; click again to cancel |
| Done | turns into an undo arrow | one click back, or `Ctrl+Z` |
| Failed | red retry icon | hover for the reason; settings shows errors kept in page memory |

## Three things worth not confusing

### 1. Whether it reads the conversation

![Empty session vs. existing conversation: the small dot in the corner is the marker](https://cdn.jsdelivr.net/npm/dsh-prompt-rewriter/docs/images/03-context-modes-en.png)

The **small dot in the button's lower-right corner** is the whole difference:

- **No dot**: it sees only your current draft.
- **Dot**: it also reads earlier turns, so it knows what you already confirmed and already ruled out. The rewrite lands closer to what you actually want this time.

The dot describes **what will happen if you click now**, not what happened last time. That is why it hides while a run is in flight, comes back after a failure, and disappears once the button turns into an undo arrow — clicking then restores your draft, which has nothing to do with enhancement.

Conversation context costs tokens. If long chats feel slow or expensive, turn off *Reference the conversation* in settings and the dot disappears.

### 2. Whether it reads images

Only images **currently sitting in the composer** — **never images from earlier messages**. That line is deliberate: old pasted screenshots are slow to process and easy to misread, so they are excluded.

### 3. Whether it reads attachments

Only **non-image attachments currently in the composer** — attachments from earlier turns are never read. The cap is **2 files per run, 5 MiB each**; text-like files send at most the first 6,000 characters as a preview. With *Reference attachment content* off, it sends up to 8 file names and no content.

## Settings

`Settings → Prompt Enhance`. Five switches and two selectors (model, rule set), plus a **custom rules** entry inside the rule-set dropdown, affecting **only this button, never normal sending**.

The settings page no longer shows upstream repository links; the old screenshot has been removed from the package so it cannot document the retired UI.

| Option | Default | What turning it on does |
|---|---|---|
| Use a fixed model | Off | Off: follow the model of the current conversation. On: always use the model picked below. |
| Enhancement rule set | **Legacy (stable)** | Three choices: **Legacy** ships the 1.7.1 playbook verbatim (15 rows, 10 of them rules; about 1.2–3× the draft); **intent-first** works out what the user actually wants, then writes it out more clearly and more completely (the six dimensions are covered wherever the task needs them: goal / inputs / scope / method / output / quality bar; where the draft is silent the executor is told to decide and state its assumption; a sparse draft usually grows to 2–5× its length, never beyond 5×); **WorkBuddy** uses its shipped prompt verbatim (analyse objective, ambiguity, clarity and missing context, then rewrite against its seven principles; the cap is around 800 characters and this set has no verbatim-fact clause, so long drafts get compressed). |None of them answer the request itself; legacy and intent-first explicitly forbid asking the user, and any question WorkBuddy returns is dropped by the plugin. |
| Reference the conversation | **On** | Read earlier turns. More accurate, but extra tokens and slower on long chats. |
| Reference composer images | Off | Images in the composer take part. Earlier messages' images are never read. |
| Reference attachment contents | **On** | On: reads up to 2 non-image files from the composer, up to 5 MiB each; text files send a preview capped at 6,000 characters. Off: file contents are not read or sent; up to 8 filenames may be included as context. |
| Shortcut | Off | Lets the keyboard trigger a rewrite. Off by default, so no global key fires unasked. |

- The model dropdown lists **the providers and models you actually have** — you can't type in one that doesn't exist.
- Turning the model switch off does not clear your selection; flipping it back on shows the same choice.
- Images still uploading or over the Host attachment service's per-image or per-message limit are skipped; the status area reports how many were missed. A rewrite never fails because of an image.
- Files over the count or size limit are skipped and reported in the result status.
- The **current version** appears as plain text in the top-right. Record the branch and commit hash as well to identify a customized build.
- **Custom rules**: pick "Custom: <name>" in the rule-set dropdown to use one. "＋ Add rule" opens two fields — a **meta prompt** on top (one click to copy; when the clipboard is unavailable the field is selected for you and the hint says to press Ctrl+C) and a paste box below. Send the meta prompt to your own AI; it returns a rule set built from your habits, preferences and memory. Paste the body back, give it a name and save. Up to 10 rules, 4000 characters each. Every entry can be **disabled or enabled**; disabling or deleting the rule in use switches the selection back to **Legacy** in the same save, so a dead selection is never left behind (a hand-edited config that disables the rule in use is refused, and the run time falls back to Legacy as well).
- This fork removes the upstream Star, issue, version links and changelog panel.
- **Error log** shows recent enhancement, write and timeout errors kept only in page memory; clearing the log or reloading the page removes them.

## Install

DeepSeek Harness, `node >= 22`. **Fully quit and reopen Harness after installation**: the host imports the enhancement routes and rules at startup. Client-only hot reloading depends on the actual host version and configuration.

### Get the customized source

```sh
git clone --branch main https://github.com/langkeshuo-ai/dsh-prompt-rewriter.git
cd dsh-prompt-rewriter
npm install --ignore-scripts --omit=dev --legacy-peer-deps --package-lock=false
git log -1 --format='%H %cI %s'
```

The customized line is consolidated into the default `main`. Historical branches remain as references; new installations use this repository's `main`, not the upstream npm package. The source already contains host and client entry points.

### Add it to the profile you actually run

For a CLI-managed web profile:

```sh
dsh plugin --profile web add /absolute/path/to/dsh-prompt-rewriter
```

If the desktop CLI reports `profile "desktop" is managed exclusively by the Electron application`, use the application's plugin management path. An existing source-linked installation follows its linked checkout; see [VERSIONING.md](VERSIONING.md) for verification.

To update the existing custom branch:

```sh
git switch main
git pull --ff-only origin main
npm test
```

Fully quit and reopen DSH after host or rule changes. The npm package and upstream Releases are not installation sources for this fork.

## FAQ

**Clicked it and nothing happened.** The composer is empty, or *Use a fixed model* is on with no model picked. If you used the shortcut instead, check that the Shortcut switch is on and that no conflict is reported.

**"No credentials configured for the current model."** That model has no key set. Switch models, or pin one that works in settings.

**Can I undo the whole rewrite?** One `Ctrl+Z`. It's an ordinary edit step in the composer.

**Do my attachments survive a rewrite?** Yes. Attachment references and links stay as they were; only the text is replaced.

**Does it change messages I already sent?** No. It only edits the draft, and it never sends.

**Will it ask me a question back?** Not in the result. None of the three rule sets answers the request itself; Legacy and Intent-first forbid asking outright, and WorkBuddy's own text only forbids answering it — so any question it does emit is dropped by the plugin. If the whole reply is a question it re-runs on the legacy rules, and failing that keeps your draft.

**Do my attachments get sent?** Only with *Reference attachment content* on: at most 2 non-image attachments from the composer, 5 MiB each, and text-like files send the first 6,000 characters only. Turn it off and only the file names go out.

## Configuration

Every `config` key on the profile plugin line is optional. The first nine are managed by the settings page; the last seven are operational ceilings and are not exposed in the UI.

```yaml
- id: dsh-prompt-rewriter
  name: dsh-prompt-rewriter
  config:
    # managed by the settings page
    useCustomModel: false      # pin enhanceProvider/enhanceModel
    enhanceProvider: ""        # empty = follow the session model
    enhanceModel: ""
    ruleSet: legacy            # enhancement rule set: legacy / intent-first / workbuddy
    customRules: "[]"          # user rules as a JSON array string: max 10, 4000 chars each
    referenceImages: false     # read composer images
    referenceFiles: true       # read composer file contents
    referenceContext: true     # read earlier turns
    shortcutEnabled: false     # keyboard shortcut (off by default)

    # operational ceilings (not exposed in the UI)
    maxDraftChars: 8000        # draft length cap
    maxOutputChars: 12000      # output length cap
    maxOutputTokens: 2000      # output tokens per request
    timeoutMs: 90000           # end-to-end timeout
    historyTokenBudget: 6000   # token budget for injected history
    historyMaxMessages: 24     # max history messages
    historyMessageChars: 4000  # per-message character cap
```

## How it works

| Half | File | Responsibility |
|---|---|---|
| Host | `index.js` | Registers `POST /api/prompt-enhance` (rewrite) and `GET/POST /api/prompt-enhance/settings`, through `ctx.connection.fetch` so it inherits Harness auth and origin checks. Reads the session projection for the current model, picks the rule set from settings (`legacy-rules.mjs` / `intent-first-rules.mjs` / `workbuddy-rules.mjs`), turns composer attachments into reference material, then generates via `ctx.llm`. |
| Client | `client.js` | Renders the button at `conversation.input.right` and the settings page at `settings.section`. Replaces the draft in place via `inputActions.insertText`. |

A few designs worth calling out:

- **Context is budgeted**: injected history is `min(historyTokenBudget, contextWindow × 5%)`, collected newest-first. When a single message exceeds the whole budget, its target length is computed in one proportional step (with up to 4 correction passes for rounding and mixed-script error), then truncated rather than dropped — so "has context" never silently degrades into "no context".
- **The output budget grows on demand**: a reasoning model shares one output budget between thinking and answering, so a long draft can spend it all on reasoning and leave nothing for the reply. When the run is cut off by that budget, the plugin doubles it and retries (3500 → 7000 → 14000, capped by the model's declared maximum and never above 16000) instead of misreporting truncation as "the model returned nothing".
- **History is injected as a JSON array**, and the system prompt states explicitly that it is data, not instructions — text inside history can't forge structure.
- **The image switch is decided by the Host**: the browser uploads composer images unconditionally and the Host decides whether to use them, so a not-yet-loaded setting can't silently disable the feature.

## Known limitations

- Images from earlier messages never take part (by design; composer images only).
- Replacement is non-streaming: the button shows its animated state until the rewrite lands.
- The settings dropdown depends on the Host's `remote.session.modelCatalog`. When that surface is unavailable it says so explicitly rather than rendering an empty list.
- Attachments are composer-only: files from earlier turns never take part, and a run reads at most 2 files of 5 MiB each.
- The WorkBuddy rule set has no verbatim-fidelity clause, so long drafts get compressed toward its ~800-character ceiling.

## Development

The plugin has a Host half and a Client half. The Host depends only on host services such as `ctx.connection`, `ctx.llm` and `ctx.settings`; the Client registers slot components through `window.__ModuleLoader__`. **The two halves load differently, so they are verified differently**:

| What changed | How it takes effect | Host restart |
| --- | --- | --- |
| `client.js` (button, interaction, wording, styles) | A host with client HMR enabled can replace the front-end resources | Depends on the host; refresh or restart when needed |
| `index.js`, `*-rules.mjs` (enhancement route, prompt rules, settings storage) | Imported once when the Host starts | Required |

Client resource replacement and host code loading are separate checks. Machine-specific profile configuration is not shipped by this repository. Options saved in settings use the host settings service; host or rule file changes require a restart.

**Unit tests are not published in the npm package.** After installing runtime dependencies, `npm test` runs the Host, Client, Units and Settings suites using substitute host and React implementations, without calling a live model. See [VERSIONING.md](VERSIONING.md) for maintenance and release notes; this documentation cleanup does not publish a build.

```sh
node --check index.js            # syntax
node --check client.js
node scripts/gate.mjs            # rule/shape gate (required before release)
npm pack --dry-run               # inspect what would ship
```

## Acknowledgements

Bug reports and fix suggestions count as contributions; per-release credit lives in the matching [CHANGELOG.md](CHANGELOG.md) entry, and this section keeps the standing list and back-filled credit.

- [@YuvuShine](https://github.com/YuvuShine): reported #8 (button vanishing with a command chip, deferred result, chip rewritten as plain text) with repro steps, root-cause analysis and a fix — adopted in 1.8.4.
- [@moyuboy](https://github.com/moyuboy): reported #4 (a same-slot control covering the button by ~4px) with root-cause analysis and four fix options — adopted in 1.8.3.
- [@xutiannuo](https://github.com/xutiannuo): reported #2 (400 MissingSessionID on the OpenCode channel) with a three-line fix — adopted in 1.7.1.

## License

Code is MIT — see [LICENSE](LICENSE). Embedded artwork falls into two classes:

| Asset | License | Inside the MIT grant? |
|---|---|---|
| Plugin code | MIT | yes |
| Whale-tail 36-frame outline (from `dsh-status-rotator` v0.38.0 by 01Virex) | **MIT**, verified upstream (all 36 frames compared) | yes, copyright notice retained |
| DeepSeek "big fat fish" brand mark (from `dsh-web-frontend`) | **no license found** in the source package | **no**, explicitly excluded in LICENSE |

Unofficial community project, not affiliated with or endorsed by DeepSeek. Full attribution and verification notes are in [NOTICE.md](NOTICE.md).
