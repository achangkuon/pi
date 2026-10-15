# Pi overlay port to v1.3.0 — evidence

Technical ODD record for the private annotation overlay. Port of the reviewed
v1.1.0 overlay (20aa0e80a, base abe508e1) onto upstream tag v1.3.0
(71023aec1546d6d677a65669c5665c0927ce0dd0).

## Evidence

- Cherry-pick of `20aa0e80a` onto `v1.3.0` in worktree
  `/home/emili/projects/pi-v1.3.0` (branch `personal/tool-call-annotations-v1.3.0`)
  applied cleanly: 13 files, 396 insertions, 7 deletions, zero conflicts.
- Review of the three-way apply on a detached probe worktree first confirmed a
  clean apply before the port (2026-10-15).
- Build with Node `v24.21.0` (cached toolchain): `npm ci --ignore-scripts` exit 0,
  `npm run build` exit 0.
- Overlay tests on the patched v1.3.0 source: `packages/tui`
  `node --test test/text-inline-suffix.test.ts` — 0 failures;
  `packages/coding-agent` `npx vitest --run test/extensions-runner.test.ts
  test/tool-execution-component.test.ts` — 2 files, 111/111 passed.
- Drift-mode rebuild of the live global Pi 1.3.0 with the v1.1.0 pin had already
  succeeded the same day (backup
  `pi-1.3.0-public-dist-20261015T210427Z`); this re-pin removes the drift.

## Identities

- Base: `71023aec1546d6d677a65669c5665c0927ce0dd0` (tag `v1.3.0`),
  tree `25e0557c8b13f98848bebd48fe7922908f66fe4a`
- Reviewed: `10d9ab63a5bd4cf0c7dd5236f81f6c3590b7d9f5`
- Patch: `git format-patch --stdout 71023aec1..10d9ab63a -- packages/`,
  SHA-256 recorded in `personal-pi/manifest.json` (control-tower repo).
