import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { readingMinutes } from "../src/lib/reading.ts";

describe("readingMinutes", () => {
  it("returns at least 1 for a short body", () => {
    assert.equal(readingMinutes("短い"), 1);
  });

  it("ignores fenced code when counting", () => {
    const body = `${"あ".repeat(500)}\n\`\`\`\n${"い".repeat(500)}\n\`\`\``;
    assert.equal(readingMinutes(body), 1);
  });
});
