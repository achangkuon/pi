# Personal tool call annotations on v1.0.0

Port of the private overlay to upstream tag v1.0.0. Private source overlay, not a Pi release.

- Base: a13d35a742c6ef8462812a28fbe1d8c8b7431c32 (tag v1.0.0)
- Reviewed commit: db4a38585f6e23e2dca54fc2a5b8c7b5173b8cdc
- Previous pin: reviewed 483b50c9afef70f89c136a7b469187682682fd09 on base fd889a2741891ee45116cb6131052d7fad220886

## Method

`git apply --3way --index` of the previous 13-path patch. Eleven paths applied cleanly.
Two conflicts were resolved by keeping both sides:

- `packages/coding-agent/src/index.ts`: upstream added the `ToolAnnotations` export next to `ToolCallAnnotation`.
- `packages/coding-agent/docs/extensions.md`: upstream added the "Tool exposure" section where the annotation section was inserted.

No independent review was run for this port; the change is mechanical.

## Evidence

- Build: `npm ci --ignore-scripts && npm run build` with Node v24.21.0, exit 0.
- `packages/tui`: `node --test test/text-inline-suffix.test.ts`, 4 passed.
- `packages/coding-agent`: `vitest --run test/extensions-runner.test.ts test/tool-execution-component.test.ts`, 108 passed, 1 failed.
  The failure ("renders outside AGENTS.md read results compactly until expanded") also fails on unpatched v1.0.0
  in the same checkout: the checkout path was long enough to wrap the row at 120 columns.
- RPC start with gentle-pi 4.0.0 and the Chanks controls extension: unpatched build fails with
  "pi.registerToolCallAnnotation is not a function"; patched build starts without extension errors.
