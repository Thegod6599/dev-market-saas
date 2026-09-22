import { isSupabaseConfigured, supabase } from '../lib/supabase';

const CATEGORY_FIELDS =
  'id,name,slug,section_type,is_under_construction,display_order,is_active';
const COMPONENT_FIELDS =
  'id,name,slug,type,description,category_id,status,is_vip,preview_url,code_reference,created_at,updated_at';

function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      'The public library is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to continue.',
    );
  }

  return supabase;
}

function throwIfError(result, resourceName) {
  if (result.error) {
    throw new Error(`Unable to load ${resourceName}: ${result.error.message}`);
  }

  return result.data ?? [];
}

async function loadTagsForComponents(client, componentIds) {
  if (componentIds.length === 0) return new Map();

  const relationshipsResult = await client
    .from('component_tags')
    .select('component_id,tag_id')
    .in('component_id', componentIds);
  const relationships = throwIfError(relationshipsResult, 'component tags');

  const tagIds = [...new Set(relationships.map((relationship) => relationship.tag_id))];
  if (tagIds.length === 0) return new Map();

  const tagsResult = await client.from('tags').select('id,name,slug').in('id', tagIds);
  const tags = throwIfError(tagsResult, 'tags');
  const tagsById = new Map(tags.map((tag) => [tag.id, tag]));
  const tagsByComponentId = new Map();

  for (const relationship of relationships) {
    const tag = tagsById.get(relationship.tag_id);
    if (!tag) continue;

    const componentTags = tagsByComponentId.get(relationship.component_id) ?? [];
    componentTags.push(tag);
    tagsByComponentId.set(relationship.component_id, componentTags);
  }

  return tagsByComponentId;
}

function attachTags(components, tagsByComponentId) {
  return components.map((component) => ({
    ...component,
    tags: tagsByComponentId.get(component.id) ?? [],
  }));
}

export async function getLibrary() {
  const client = requireSupabase();
  const [categoriesResult, componentsResult] = await Promise.all([
    client
      .from('categories')
      .select(CATEGORY_FIELDS)
      .eq('is_active', true)
      .order('display_order', { ascending: true, nullsFirst: false }),
    client
      .from('components')
      .select(COMPONENT_FIELDS)
      .eq('status', 'published')
      .order('created_at', { ascending: false }),
  ]);

  const categories = throwIfError(categoriesResult, 'library sections');
  const components = throwIfError(componentsResult, 'components');
  const tagsByComponentId = await loadTagsForComponents(
    client,
    components.map((component) => component.id),
  );

  return {
    categories,
    components: attachTags(components, tagsByComponentId),
  };
}

export async function getComponentBySlug(slug) {
  const client = requireSupabase();
  const componentResult = await client
    .from('components')
    .select(COMPONENT_FIELDS)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (componentResult.error) {
    throw new Error(`Unable to load component: ${componentResult.error.message}`);
  }

  if (!componentResult.data) return null;

  const [categoriesResult, tagsByComponentId] = await Promise.all([
    client.from('categories').select(CATEGORY_FIELDS).eq('id', componentResult.data.category_id).maybeSingle(),
    loadTagsForComponents(client, [componentResult.data.id]),
  ]);

  if (categoriesResult.error) {
    throw new Error(`Unable to load component section: ${categoriesResult.error.message}`);
  }

  return {
    ...componentResult.data,
    category: categoriesResult.data ?? null,
    tags: tagsByComponentId.get(componentResult.data.id) ?? [],
  };
}

export function getComponentResourceUrl(component) {
  if (!component?.code_reference) return null;

  const reference = String(component.code_reference);
  if (/^(https?:|blob:|data:)/i.test(reference)) return reference;

  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/?$/, '/')}${reference.replace(/^\/+/, '')}`;
}