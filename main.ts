// ooo-reply-01 — one out-of-office auto-reply, 62 characters.
// The program writes the line to /output/entry.txt (the grader's
// artifact) and prints it to stdout.
//
// The joke: it inverts the usual away-message triage. Instead of
// promising to deal with urgent mail on return, it settles the
// question before the sender can ask it — if it were urgent, the
// sender would already know, because the author checked. No beach,
// no inbox, no "limited access": the laugh is the pre-emptive
// verdict on the sender's emergency.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The gate only accepts 1-160 characters of non-whitespace text.
const MAX_CHARS = 160;

const ENTRY =
  "I'm off. If this is urgent, it isn't. I checked before I left.";

// Refuse to emit an over-long line rather than hand the judge an invalid entry.
if (ENTRY.length > MAX_CHARS || ENTRY.trim().length === 0) {
  console.error(`entry is ${ENTRY.length} characters, must be 1-${MAX_CHARS}`);
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");

// Verify what the grader will read: re-read the artifact and fail loudly
// on any mismatch instead of silently shipping a wrong or truncated line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY + "\n") {
  console.error("entry.txt does not match the entry line");
  process.exit(1);
}
console.log(ENTRY);
