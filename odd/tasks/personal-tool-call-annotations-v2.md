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

- [x] Implement and verify the complete v2 textual tool-call annotation API as one accepted size-exception unit.

## Verification

- `bun test test/text-inline-suffix.test.ts` from `packages/tui`: 4/4 passed. The repository-prescribed Node test runner was unavailable because this host's Node 22.22.1 does not recognize `.ts` test files.
- Targeted coding-agent Vitest: 108/108 passed.
- `npm run check`: passed, including Biome, dependency/entry graph checks, shrinkwrap/install-lock checks, TypeScript typecheck, and browser smoke check.
- `git diff --check`: passed.
- Independent verifier: PASS, with the Node-runner limitation above preserved.
- Native review `review-44c3659aaede7d9d`: approved and acknowledged for target `sha256:4bf25658a126edbf334a67bf431655a73ad1d9b70b3cf65f786850472ee9dd9d`; four advisory warnings were non-blocking.

## Evidence

- Work-unit commit: `483b50c9afef70f89c136a7b469187682682fd09` (`feat(coding-agent,tui): add tool call annotations`).
- The source commit contains the exact reviewed candidate.
- This follow-up changes only this passive task record to capture the immutable commit and verification evidence.
- No personal Pi installation or Control Tower consumer change has occurred yet.
