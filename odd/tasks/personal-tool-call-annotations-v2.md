# Personal textual tool-call annotations v2

## Goal

Add a generic, presentation-only Pi extension API that lets a personal extension attach optional inline text to standard textual tool-call renderers without registering, replacing, or modifying the tool.

## Authority

- Emilio selected a personal Pi hook plus Control Tower-owned configuration.
- Emilio accepted automatic coverage for textual tools, including gentle-pi `read` and `bash`; arbitrary custom visual cards may opt in explicitly and are not guaranteed automatically.
- No `gentle-pi` source change, public issue, pull request, or publication is authorized.
- Emilio accepted one implementation unit despite the refined 350–550 changed-line forecast.
- Source is kept on `personal/tool-call-annotations-v2`; commit and push remain separately authorized actions.
- The failed v1 candidate remains preserved unchanged in the sibling worktree and must not be used as an implementation base.

## Allowed edit surfaces

- `odd/tasks/personal-tool-call-annotations-v2.md`
- `.gitignore` (only the local `.atl/` runtime-cache ignore created by the delegated writer harness)
- `packages/tui/src/components/text.ts`
- `packages/tui/src/index.ts`
- Focused tests under `packages/tui/test/` for the textual inline-slot contract
- `packages/coding-agent/src/core/extensions/types.ts`
- `packages/coding-agent/src/core/extensions/loader.ts`
- `packages/coding-agent/src/core/extensions/runner.ts`
- `packages/coding-agent/src/core/extensions/index.ts`
- `packages/coding-agent/src/index.ts`
- `packages/coding-agent/src/modes/interactive/interactive-mode.ts`
- `packages/coding-agent/src/modes/interactive/components/tool-execution.ts`
- `packages/coding-agent/test/extensions-runner.test.ts`
- `packages/coding-agent/test/tool-execution-component.test.ts`
- `packages/coding-agent/docs/extensions.md`

No dependency, lockfile, package manifest, changelog, installed runtime, user settings, renderer-owner source, or `gentle-pi` file may change.

## Required behavior

- Register an optional single-line textual annotation for a named tool without registering or replacing that tool.
- Standard `Text` tool-call renderers expose an explicit pre-padding inline slot; components without the contract fail closed and render unchanged.
- Preserve the owning renderer's content, wrapping, line count, execution, arguments, results, model-visible content, collapse behavior, and background/padding behavior.
- Omit annotations that are empty, unsafe, fail, or do not fit the available inline slot; never wrap, truncate owner content, or add a row.
- Prevent annotation inheritance of owner SGR styles or OSC-8 links, including hostile unclosed sequences.
- Apply multiple annotations in deterministic extension registration order.
- Remove registrations from failed factories and old runtimes after reload.
- Evaluate current cloned arguments on render so streaming updates and historical replay remain consistent.
- Keep non-TUI modes unaffected.
- Do not use `pi.events` as a request/response renderer handshake.

## Task

- [ ] Implement and verify the complete v2 textual tool-call annotation API as one accepted size-exception unit.

## Verification

Pending. Repository policy requires targeted Vitest for each modified test file and full-output `npm run check`. Do not run `npm test` or a build unless Emilio explicitly requests it.

## Evidence

Pending.
