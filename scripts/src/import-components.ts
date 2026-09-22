import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type ComponentMetadata = {
  name: string;
  slug: string;
  type: string;
  category: string;
  description?: string;
  tags?: string[];
  is_vip?: boolean;
  status?: string;
  preview_url?: string;
  code_reference?: string;
};

type ImportSummary = {
  folder: string;
  slug?: string;
  status: "created" | "updated" | "failed";
  message: string;
};

type ImportClient = SupabaseClient<any, "public", any, any, any>;

const rootDirectory = process.argv[2];
const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function fail(message: string): never {
  throw new Error(message);
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return typeof error === "string" ? error : JSON.stringify(error);
}

function requireConfig() {
  if (!rootDirectory) {
    fail("Usage: pnpm --filter @workspace/scripts import-components <components-folder>");
  }
  if (!supabaseUrl) {
    fail("SUPABASE_URL or VITE_SUPABASE_URL is required.");
  }
  if (!serviceRoleKey) {
    fail(
      "SUPABASE_SERVICE_ROLE_KEY is required for the developer importer. Never expose it as a VITE_ variable.",
    );
  }
}

function validateMetadata(value: unknown, folderName: string): ComponentMetadata {
  if (!value || typeof value !== "object") fail(`${folderName}: metadata.json must contain an object.`);
  const metadata = value as Partial<ComponentMetadata>;
  const requiredFields: Array<keyof ComponentMetadata> = ["name", "slug", "type", "category"];
  const missingFields = requiredFields.filter((field) => !metadata[field]);

  if (missingFields.length) {
    fail(`${folderName}: missing required metadata fields: ${missingFields.join(", ")}.`);
  }

  return {
    name: String(metadata.name),
    slug: String(metadata.slug),
    type: String(metadata.type),
    category: String(metadata.category),
    description: metadata.description ? String(metadata.description) : "",
    tags: Array.isArray(metadata.tags) ? metadata.tags.map(String) : [],
    is_vip: Boolean(metadata.is_vip),
    status: metadata.status ? String(metadata.status) : "published",
    preview_url: metadata.preview_url ? String(metadata.preview_url) : undefined,
    code_reference: metadata.code_reference ? String(metadata.code_reference) : undefined,
  };
}

async function readComponentFolders(directory: string) {
  const entries = await readdir(directory, { withFileTypes: true });
  const folders = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const results: Array<{ folderName: string; directory: string; metadata: ComponentMetadata }> = [];

  for (const folderName of folders) {
    const folderPath = path.join(directory, folderName);
    const metadataPath = path.join(folderPath, "metadata.json");
    const componentPath = path.join(folderPath, "component.jsx");
    const metadata = validateMetadata(JSON.parse(await readFile(metadataPath, "utf8")), folderName);

    await stat(componentPath);
    results.push({ folderName, directory: folderPath, metadata });
  }

  return results;
}

async function findOrCreateCategory(client: ImportClient, categoryName: string) {
  const slug = categoryName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const existing = await client.from("categories").select("id").eq("slug", slug).maybeSingle();
  if (existing.error) throw existing.error;
  if (existing.data) return existing.data.id;

  const created = await client
    .from("categories")
    .insert({ name: categoryName, slug, section_type: "components", is_active: true })
    .select("id")
    .single();
  if (created.error) throw created.error;
  return created.data.id;
}

async function findOrCreateTag(client: ImportClient, tagName: string) {
  const slug = tagName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const existing = await client.from("tags").select("id").eq("slug", slug).maybeSingle();
  if (existing.error) throw existing.error;
  if (existing.data) return existing.data.id;

  const created = await client.from("tags").insert({ name: tagName, slug }).select("id").single();
  if (created.error) throw created.error;
  return created.data.id;
}

async function importComponent(
  client: ImportClient,
  item: { directory: string; folderName: string; metadata: ComponentMetadata },
): Promise<ImportSummary> {
  const { metadata, folderName, directory } = item;

  try {
    const categoryId = await findOrCreateCategory(client, metadata.category);
    const component = await client
      .from("components")
      .upsert(
        {
          name: metadata.name,
          slug: metadata.slug,
          type: metadata.type,
          description: metadata.description,
          category_id: categoryId,
          status: metadata.status,
          is_vip: metadata.is_vip,
          preview_url: metadata.preview_url ?? null,
          code_reference: metadata.code_reference ?? path.join(directory, "component.jsx"),
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();
    if (component.error) throw component.error;

    const tagIds = await Promise.all((metadata.tags ?? []).map((tag) => findOrCreateTag(client, tag)));
    const relationshipResult = await client.from("component_tags").delete().eq("component_id", component.data.id);
    if (relationshipResult.error) throw relationshipResult.error;
    if (tagIds.length) {
      const createdRelationships = await client
        .from("component_tags")
        .insert(tagIds.map((tagId) => ({ component_id: component.data.id, tag_id: tagId })));
      if (createdRelationships.error) throw createdRelationships.error;
    }

    return {
      folder: folderName,
      slug: metadata.slug,
      status: "updated",
      message: `registered ${metadata.name}`,
    };
  } catch (error) {
    return {
      folder: folderName,
      slug: metadata.slug,
      status: "failed",
      message: getErrorMessage(error),
    };
  }
}

async function main() {
  requireConfig();
  const client: ImportClient = createClient(supabaseUrl!, serviceRoleKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const items = await readComponentFolders(rootDirectory!);
  const results: ImportSummary[] = [];

  for (const item of items) {
    results.push(await importComponent(client, item));
  }

  for (const result of results) {
    console.log(`[${result.status}] ${result.folder}: ${result.message}`);
  }

  const failures = results.filter((result) => result.status === "failed");
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(getErrorMessage(error));
  process.exitCode = 1;
});