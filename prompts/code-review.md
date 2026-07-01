---
name: code-review
description: Review the branch diff against its base branch, identify concrete risks and regressions, and write a GitLab-ready markdown review file.
---

## Goal

Perform a code review based on the diff between the current branch and its base
branch (`develop` or `main`). Focus on real findings: bugs, regressions, risky
behavior changes, missing validation, broken conventions, and missing tests.

Assume repo structure, conventions, and workflow guidance are already defined in
`agents/rules/` and `coding-guidelines.md`. Do not restate that context
unless it matters to a specific finding.

## Inputs

- Extract an identifier from the current branch name when possible:
  - `feature/my-feature` -> `my-feature`
  - `fix/some-fix` -> `some-fix`
  - If no identifier can be extracted, use the full branch name
- Detect the base branch (`main`), preferring `origin/main` when available

## Diff Source of Truth

- Base the review on `git diff <base-branch>...HEAD`
- Use `git log <base-branch>..HEAD` for commit context when helpful
- If a `DIFF CONTEXT (base...HEAD)` block is provided, treat it as the source of truth and do not require extra git commands

## Review Priorities

1. Functionality and behavioral regressions
2. Broken repo conventions (CSS structure, component patterns, TypeScript rules)
3. Missing error handling, validation, or unsafe defaults
4. Performance, SSR, and maintainability risks

## Required Repo-Specific Checks

- Flag any new env vars added to `nuxt.config.ts` `runtimeConfig` that are not documented
- Call out deviations from `coding-guidelines.md` conventions (BEM, script order, arrow functions) only when they matter to correctness or consistency

## Output Rules

- Findings first, ordered by severity
- Every finding must be concrete and tied to the diff
- Be specific about impact and why it matters
- If there are no findings, say that explicitly
- Keep the tone constructive and actionable

## Output Format

Write a markdown file at:

`docs/code-review/<TICKET>.md`

Overwrite the file if it already exists.

Use this structure:

```md
# Code Review: <TICKET>

## Summary

Short overall assessment of the branch diff.

## Findings

### [Must] Title

What is wrong, where it appears, why it matters, and what should change.

### [Suggestion] Title

Optional improvement with clear rationale.

## Checks Performed

- Diff reviewed against `<base-branch>...HEAD`
- Convention audit against `agents/rules/` and `coding-guidelines.md`
- Env var audit against `nuxt.config.ts` `runtimeConfig` where relevant
```

## Completion Rule

The task is complete only when the markdown file has been written to
`docs/code-review/<TICKET>.md`.
