# Personal tool call annotations on v1.1.0

Port of the private overlay to upstream tag v1.1.0. Private source overlay, not a Pi release.

- Base: abe508e1b89912adde45528136c3221eb69acdd7 (tag v1.1.0)
- Reviewed commit: 20aa0e80a0c00c90f1979313b979a15523466582
- Previous pin: reviewed db4a38585f6e23e2dca54fc2a5b8c7b5173b8cdc on base a13d35a742c6ef8462812a28fbe1d8c8b7431c32 (tag v1.0.0)

## Method

`git cherry-pick` (three-way) of the v1.0.0 reviewed commit onto v1.1.0. Eleven paths applied cleanly.
Four conflict sites in two files were resolved by keeping both sides:

- `packages/coding-agent/src/modes/interactive/components/tool-execution.ts`: upstream added `outputPad?`
  to `ToolExecutionOptions` where the patch added `getCallAnnotations?`; both fields kept.
- `packages/coding-agent/src/modes/interactive/interactive-mode.ts`: three `ToolExecutionComponent`
  constructor sites where upstream added `outputPad: this.outputPad` next to the patch's
  `getCallAnnotations` callback; both kept.

No independent review was run for this port; the change is mechanical.

## Evidence

- Build: `npm ci --ignore-scripts && npm run build` with Node v24.21.0, exit 0.
- `packages/tui`: `node --test test/text-inline-suffix.test.ts`, 4 passed.
- `packages/coding-agent`: `vitest --run test/extensions-runner.test.ts test/tool-execution-component.test.ts`,
  111 passed, 0 failed (v1.1.0 adds two tests over the v1.0.0 run's 109).
