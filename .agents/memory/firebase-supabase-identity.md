---
name: Firebase–Supabase identity mapping
description: Identity-linking constraints for user-owned Supabase feedback and deletion.
---

The app authenticates users with Firebase. The live Supabase feedback policies use `auth.uid()`, and feedback ownership references `public.profiles.id`. The project has no confirmed, trusted mapping from Firebase UIDs to Supabase profile IDs. Do not infer a match from email or assume the identifiers are equal.

**Why:** An incorrect link could assign or delete another person's feedback. The user explicitly requires a verified server-side mapping and approval before any speculative identity or schema change.

**How to apply:** Before user-scoped Supabase reads, writes, or deletion, require a server-verified mapping. Fail closed when no mapping exists; keep privileged Supabase credentials server-only and leave existing RLS unchanged unless the user explicitly approves a change.
