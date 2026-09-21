import { auth } from "../firebase/firebase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    "VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are required.",
  );
}

async function request(path, options = {}) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("A signed-in Firebase user is required for Supabase requests.");
  }

  const idToken = await user.getIdToken();
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: supabasePublishableKey,
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${message}`);
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export function select(table, query) {
  return request(`${table}?${query}`, {
    headers: { Accept: "application/json" },
  });
}

export function upsert(table, values) {
  return request(table, {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(values),
  });
}

export function update(table, query, values) {
  return request(`${table}?${query}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(values),
  });
}

export function remove(table, query) {
  return request(`${table}?${query}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal" },
  });
}
