---
name: Supabase library schema
description: Non-obvious schema constraints used by the public component library importer.
---

The existing Supabase schema requires categories created for the library to use `section_type: "category"` and requires an explicit `components.id`; tags and categories can use their database defaults. Component imports should preserve an existing ID when updating by slug and generate one only for new records.

**Why:** The schema is pre-existing and protected by constraints; using a guessed section type or relying on a component ID default makes the developer importer fail even though the public read connection works.

**How to apply:** Keep importer payloads aligned with the live schema definition from the Supabase REST schema endpoint. Do not change the database schema or weaken its policies to accommodate the importer.