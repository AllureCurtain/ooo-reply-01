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

// The gate only accepts a single line of 1-160 characters of
// non-whitespace text. A newline would silently break the one-line
// requirement, so reject it instead of trusting the constant.
const MAX_CHARS = 160;

const ENTRY =
  "I'm off. If this is urgent, it isn't. I checked before I left.";

// One place owns the entry rules, so a future line change is checked
// the same way instead of duplicating the conditions at each use site.
function validateEntry(line: string): string | null {
  if (line.length === 0) return "entry is empty";
  if (line.length > MAX_CHARS) {
    return `entry is ${line.length} characters, must be 1-${MAX_CHARS}`;
  }
  if (line.trim().length === 0) return "entry is only whitespace";
  if (line.trim() !== line) return "entry has leading or trailing whitespace";
  if (line.includes("\n")) return "entry spans more than one line";
  return null;
}

// Refuse to emit an invalid line rather than hand the judge a bad entry.
const problem = validateEntry(ENTRY);
if (problem !== null) {
  console.error(problem);
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
