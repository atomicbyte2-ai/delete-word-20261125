// The Word You'd Delete From the Dictionary
// Entry program: writes the single word to entry.txt in the output dir.
//
// The word: supercalifragilisticexpialidocious
// Thirty-four letters of pure spectacle. Nobody can spell it, nobody
// needs it, and the dictionary is lighter without it. Deleting it is
// the joke: the word that exists only to be unspellable gets erased.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "supercalifragilisticexpialidocious";

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
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(word)) {
    throw new Error("word must not contain control characters");
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
