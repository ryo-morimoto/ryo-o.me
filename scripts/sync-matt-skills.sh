#!/usr/bin/env bash
set -euo pipefail

# Syncs the Matt Pocock skills that dmmulroy/skills vendors
# (https://github.com/mattpocock/skills) into .cursor/skills/.
# Do not edit the vendored skill files by hand; re-sync instead.
#
# Run from anywhere:
#   scripts/sync-matt-skills.sh            # sync from upstream main
#   MATT_SKILLS_REF=<sha|tag|branch> scripts/sync-matt-skills.sh

REPO="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${MATT_SKILLS_DEST:-$REPO/.cursor/skills}"
UPSTREAM_URL="${MATT_SKILLS_URL:-https://github.com/mattpocock/skills.git}"
UPSTREAM_REF="${MATT_SKILLS_REF:-main}"

# Map of upstream skill paths (relative to the upstream `skills/` dir) that we
# vendor as top-level skills under .cursor/skills/. The destination name is
# the basename.
SKILLS=(
  "productivity/grill-me"
  "productivity/grilling"
  "engineering/domain-modeling"
  "engineering/grill-with-docs"
  "engineering/tdd"
)

append_override() {
  printf '\n%s\n' "$2" >> "$1"
  echo "  appended override to $1"
}

apply_overrides() {
  echo
  echo "Applying local overrides..."

  append_override "$DEST/tdd/SKILL.md" "$TDD_OVERRIDE"
}

read -r -d '' TDD_OVERRIDE <<'MD' || true
## Local overrides (dmmulroy/skills)

This skill is vendored from mattpocock/skills. In this repository,
`../coding-standards/SKILL.md` is the source of truth and **supersedes
`mocking.md`** wherever they disagree:

- Do not use module-patching APIs (`vi.mock`, `jest.mock`) or method-spy APIs
  (`vi.spyOn`, `jest.spyOn`). Replace behavior through a real seam instead
  (constructor-injected dependency, Effect service/layer, recording fake adapter,
  local database, runtime binding).
- Prefer recording fakes supplied through production seams over mocks, even at
  system boundaries.
- Match evidence to risk and use representative databases or runtimes for claims that depend on them.
MD

write_source_pin() {
  local full_sha="$1"
  cat > "$DEST/matt-pocock-skills.SOURCE.md" <<EOF
# mattpocock/skills (vendored)

Upstream: https://github.com/mattpocock/skills
Commit: \`$full_sha\`
License: MIT (see \`matt-pocock-skills.LICENSE\`)

Vendored from [mattpocock/skills](https://github.com/mattpocock/skills) so the
collection is self-contained, matching the set [dmmulroy/skills](https://github.com/dmmulroy/skills)
documents. Do not edit these skills by hand; re-sync instead.

- \`grilling/\` — model-invoked relentless interview loop.
- \`grill-me/\` — user-invoked grilling session.
- \`domain-modeling/\` — model-invoked glossary and architectural-decision workflow.
- \`grill-with-docs/\` — user-invoked grilling session that also builds docs such as ADRs and a glossary.
- \`tdd/\` — model-invoked red-green-refactor test-driven development.

Resync with:

\`\`\`
scripts/sync-matt-skills.sh                 # from upstream main
MATT_SKILLS_REF=<sha|tag|branch> scripts/sync-matt-skills.sh
\`\`\`
EOF
}

tmp="$(mktemp -d)"
cleanup() { rm -rf "$tmp"; }
trap cleanup EXIT

echo "Cloning $UPSTREAM_URL ($UPSTREAM_REF)..."
if git clone --quiet --depth 1 --branch "$UPSTREAM_REF" "$UPSTREAM_URL" "$tmp/upstream" 2>/dev/null; then
  :
else
  git clone --quiet "$UPSTREAM_URL" "$tmp/upstream"
  git -C "$tmp/upstream" checkout --quiet "$UPSTREAM_REF"
fi

synced_sha="$(git -C "$tmp/upstream" rev-parse HEAD)"
synced_short="$(git -C "$tmp/upstream" rev-parse --short HEAD)"

mkdir -p "$DEST"

if [ -f "$tmp/upstream/LICENSE" ]; then
  cp "$tmp/upstream/LICENSE" "$DEST/matt-pocock-skills.LICENSE"
fi

for entry in "${SKILLS[@]}"; do
  src="$tmp/upstream/skills/$entry"
  name="$(basename "$entry")"
  dest="$DEST/$name"

  if [ ! -f "$src/SKILL.md" ]; then
    echo "error: upstream skill not found: skills/$entry" >&2
    exit 1
  fi

  rm -rf "$dest"
  mkdir -p "$dest"
  cp -R "$src/." "$dest/"
  rm -rf "$dest/.git"

  echo "synced $entry -> .cursor/skills/$name/"
done

apply_overrides
write_source_pin "$synced_sha"

echo
echo "Done. Vendored from mattpocock/skills@$synced_short (with local overrides)"
echo "Review changes with: git -C \"$REPO\" status"
