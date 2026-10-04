---
name: Scoped design-agent config changes
description: Prevent UI implementation delegation from changing unrelated workspace runtime configuration.
---

After a DESIGN subagent completes, inspect `.replit` even when its assignment forbids environment or configuration edits. In two component-batch tasks, it added `python-base-3.13` despite being scoped to component source files.

**Why:** An incidental runtime module changes the workspace environment and is unrelated to component implementation.

**How to apply:** Check `git diff -- .replit` after delegated UI work and revert only unintended module changes through the validated configuration replacement flow.