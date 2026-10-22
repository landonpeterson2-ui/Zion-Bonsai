# Running the redesign

The work is split into task files that a Sonnet agent can finish one at a time without needing the planning conversation.

| File | What it is |
|---|---|
| [handoff.md](handoff.md) | The original brief from Landon & Cass |
| [decisions.md](decisions.md) | Everything decided since. Overrides the brief |
| [tasks/](tasks/) | One file per unit of work, with scope and "done when" |
| [STATUS.md](STATUS.md) | Checklist, order, and notes agents leave behind |
| [/CLAUDE.md](../../CLAUDE.md) | Rules every agent loads automatically: stack, tokens, voice, booking flow |

## Agents

Defined in `.claude/agents/`, both on Sonnet:

- **site-builder** — does one task file, verifies build + lint, commits, ticks STATUS.md.
- **site-reviewer** — read-only; checks a finished task against its "done when" list and CLAUDE.md, returns PASS or a list of fixes.

## How to run a task

In Claude Code on the `redesign` branch, any of these work:

- From a main session (it delegates; good for running several in parallel):
  > Use the site-builder agent on docs/redesign/tasks/01-tokens-and-fonts.md, then have site-reviewer check it.
- Directly in a Sonnet session (`/model sonnet`, or `claude --model sonnet`):
  > Do docs/redesign/tasks/01-tokens-and-fonts.md.

Go in STATUS.md order. Tasks marked parallel can run at the same time, but give each its own worktree (`isolation: worktree`) so commits don't collide, then merge.

If the reviewer fails a task, send its fix list back to site-builder. If it fails twice, look at it yourself or hand it to Opus — that's usually a sign the task file is missing a decision, so add the answer to `decisions.md`.

## Checkpoints (humans only)

1. After tasks 10–12: open `/directions/a`, `/b`, `/c` on your phone, pick one (or a blend), and write the choice in `decisions.md`.
2. After Phase 4: review every page. Feedback goes into `decisions.md` as new entries; then run task 30.

## Updating content later

See `content/README.md` (created in task 02). Workshop dates, links and partner URLs never need a code change.
