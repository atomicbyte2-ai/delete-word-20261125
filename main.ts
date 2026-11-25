// The Word You'd Delete From the Dictionary
// Entry program: writes the single word to entry.txt in the output dir.
//
// The word: forgettable
// The joke deletes itself. A word that means "not worth remembering"
// is the one word nobody would ever miss — erase it and nobody
// notices it was ever there. The deletion is the punchline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "forgettable";

function validate(word: string): void {
  // Length gate: 1-77 characters, matching the bounty gate.
  if (word.length < 1 || word.length > 77) {
    throw new Error(`word must be 1-77 characters, got ${word.length}`);
  }
  // Single word: no whitespace anywhere in it.
  if (/\s/.test(word)) {
    throw new Error("word must be a single word with no whitespace");
  }
  // No control characters.
  if (/[\u0000-\u001f\u007f]/.test(word)) {
    throw new Error("word must not contain control characters");
  }
  // A dictionary word is letters only: no digits, punctuation, or
  // symbols smuggled in alongside the word.
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error("word must contain letters only");
  }
  // Not only whitespace (covered by the whitespace check above, but
  // kept explicit so the intent is obvious).
  if (word.trim().length === 0) {
    throw new Error("word must not be only whitespace");
  }
}

function main(): void {
  validate(WORD);

  // The grader runs with CWD=/ and a read-only script dir, so the
  // output directory comes only from the environment, never from a
  // path relative to this script.
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), WORD, "utf8");
  console.log(`wrote entry.txt: ${WORD.length} characters`);
}

main();
