import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
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


function crc32(bytes: Buffer) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeZip(folder: string, files: Array<{ name: string; content: string }>) {
  const local: Buffer[] = [];
  const central: Buffer[] = [];
  let offset = 0;
  for (const file of files) {
    const name = Buffer.from(folder + "/" + file.name, "utf8");
    const body = Buffer.from(file.content, "utf8");
    const crc = crc32(body);
    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50, 0);
    header.writeUInt16LE(20, 4);
    header.writeUInt16LE(0x0800, 6);
    header.writeUInt16LE(0x0021, 12);
    header.writeUInt32LE(crc, 14);
    header.writeUInt32LE(body.length, 18);
    header.writeUInt32LE(body.length, 22);
    header.writeUInt16LE(name.length, 26);
    local.push(header, name, body);
    const entry = Buffer.alloc(46);
    entry.writeUInt32LE(0x02014b50, 0);
    entry.writeUInt16LE(20, 4);
    entry.writeUInt16LE(20, 6);
    entry.writeUInt16LE(0x0800, 8);
    entry.writeUInt16LE(0x0021, 14);
    entry.writeUInt32LE(crc, 16);
    entry.writeUInt32LE(body.length, 20);
    entry.writeUInt32LE(body.length, 24);
    entry.writeUInt16LE(name.length, 28);
    entry.writeUInt32LE(offset, 42);
    central.push(entry, name);
    offset += header.length + name.length + body.length;
  }
  const directory = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...local, directory, end]);
}

function packageName(name: string, slug: string) {
  const words = (name || slug).match(/[A-Za-z0-9]+/g) ?? [];
  const value = words.map((word) => word[0].toUpperCase() + word.slice(1)).join("") || "Component";
  return /^[A-Za-z_$]/.test(value) ? value : "Component" + value;
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
    const cssPath = path.join(folderPath, "component.css");
    const readmePath = path.join(folderPath, "README.md");
    const metadata = validateMetadata(JSON.parse(await readFile(metadataPath, "utf8")), folderName);

    await Promise.all([stat(componentPath), stat(cssPath), stat(readmePath)]);
    const [jsx, css, readme] = await Promise.all([
      readFile(componentPath, "utf8"), readFile(cssPath, "utf8"), readFile(readmePath, "utf8"),
    ]);
    if (!jsx.trim() || !css.trim() || !readme.trim()) fail(`${folderName}: JSX, CSS, and README must not be empty.`);
    if (!jsx.includes("./component.css")) fail(`${folderName}: component.jsx must import ./component.css.`);
    if (/devmarket|supabase|firebase/i.test(jsx + "\n" + css)) {
      fail(`${folderName}: component source must not contain DevMarket or service-specific logic.`);
    }
    const componentName = packageName(metadata.name, metadata.slug);
    const packagedJsx = jsx.replaceAll("./component.css", "./" + componentName + ".css");
    const archive = makeZip(componentName, [
      { name: componentName + ".jsx", content: packagedJsx },
      { name: componentName + ".css", content: css },
      { name: "README.md", content: readme },
    ]);
    const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
    const outputDirectory = path.join(repositoryRoot, "public", "public", "library", "packages");
    await mkdir(outputDirectory, { recursive: true });
    await writeFile(path.join(outputDirectory, metadata.slug + ".zip"), archive);
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
    .insert({ name: categoryName, slug, section_type: "category", is_active: true })
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
    const existingComponent = await client
      .from("components")
      .select("id")
      .eq("slug", metadata.slug)
      .maybeSingle();
    if (existingComponent.error) throw existingComponent.error;

    const componentPayload = {
      id: existingComponent.data?.id ?? randomUUID(),
      name: metadata.name,
      slug: metadata.slug,
      type: metadata.type,
      description: metadata.description,
      category_id: categoryId,
      status: metadata.status,
      is_vip: metadata.is_vip,
      preview_url: metadata.preview_url ?? null,
      code_reference: `library/packages/${metadata.slug}.zip`,
    };
    const component = await client
      .from("components")
      .upsert(componentPayload, { onConflict: "slug" })
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