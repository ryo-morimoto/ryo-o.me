# mattpocock/skills (vendored)

Upstream: https://github.com/mattpocock/skills
Commit: `8b78b531ab965735c5dc74f6f7a219e1e37326df`
License: MIT (see `matt-pocock-skills.LICENSE`)

Vendored from [mattpocock/skills](https://github.com/mattpocock/skills) so the
collection is self-contained, matching the set [dmmulroy/skills](https://github.com/dmmulroy/skills)
documents. Do not edit these skills by hand; re-sync instead.

- `grilling/` — model-invoked relentless interview loop.
- `grill-me/` — user-invoked grilling session.
- `domain-modeling/` — model-invoked glossary and architectural-decision workflow.
- `grill-with-docs/` — user-invoked grilling session that also builds docs such as ADRs and a glossary.
- `tdd/` — model-invoked red-green-refactor test-driven development.

Resync with:

```
scripts/sync-matt-skills.sh                 # from upstream main
MATT_SKILLS_REF=<sha|tag|branch> scripts/sync-matt-skills.sh
```
