const API_BASE = import.meta.env.VITE_API_URL || "";

async function request(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function fetchProducts() {
  const { data } = await request("/api/products");
  return data;
}

export async function fetchProductBySlug(slug) {
  const { data } = await request(`/api/products/${slug}`);
  return data;
}
