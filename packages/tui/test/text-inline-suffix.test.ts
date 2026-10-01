import assert from "node:assert/strict";
import { test } from "node:test";
import { stripTerminalSequences, Text, visibleWidth } from "../src/index.ts";

const style = (value: string) => `\x1b[2m${value}\x1b[0m`;

test("inline suffixes use only pre-padding cells and preserve owner spaces and Unicode width", () => {
	const text = new Text("界  ", 0, 0);
	assert.equal(text.setInlineSuffixes([" +a", " +b"], style), true);
	assert.deepEqual(text.render(10).map(stripTerminalSequences), ["界   +a +b"]);
	assert.deepEqual(text.render(7).map(stripTerminalSequences), ["界   +a"]);
	assert.deepEqual(text.render(5).map(stripTerminalSequences), ["界   "]);
	assert.equal(visibleWidth(text.render(10)[0]!), 10);
});

test("annotation closes owner style and OSC-8 links before styling and before padding", () => {
	for (const end of ["\x07", "\x1b\\"]) {
		for (const close of [true, false]) {
			const owner = `\x1b]8;;https://example.test${end}\x1b[31mowner${close ? `\x1b]8;;${end}\x1b[0m` : ""}`;
			const text = new Text(owner, 0, 0);
			text.setInlineSuffixes([" +note"], style);
			const row = text.render(20)[0]!;
			assert.ok(row.includes(`${owner}\x1b]8;;\x1b\\\x1b[0m\x1b[2m +note\x1b[0m`));
			assert.equal(visibleWidth(row), 20);
		}
	}
});

test("wrapping, line count, right margin, and background padding remain unchanged", () => {
	const background = (value: string) => `\x1b[44m${value}\x1b[0m`;
	const text = new Text("abcdefghij\nshort  ", 1, 1, background);
	const original = text.render(12);
	text.setInlineSuffixes([" +x"], style);
	const annotated = text.render(12);
	assert.equal(annotated.length, original.length);
	assert.deepEqual(annotated.slice(0, -2), original.slice(0, -2));
	assert.deepEqual(annotated.map(visibleWidth), original.map(visibleWidth));
	assert.equal(stripTerminalSequences(annotated.at(-2)!), " short   +x ");
	assert.ok(annotated.at(-2)!.startsWith("\x1b[44m"));
});

test("empty text remains empty and overridden Text rendering fails closed", () => {
	const empty = new Text("", 0, 0);
	assert.equal(empty.setInlineSuffixes([" +note"], style), true);
	assert.deepEqual(empty.render(20), []);
	class Overridden extends Text {
		override render(width: number): string[] {
			return super.render(width);
		}
	}
	const overridden = new Overridden("owner", 0, 0);
	assert.equal(overridden.setInlineSuffixes([" +note"], style), false);
	assert.equal(overridden.render(20)[0], "owner               ");
});
