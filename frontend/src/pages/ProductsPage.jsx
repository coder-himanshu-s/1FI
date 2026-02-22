import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/products";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
          <p className="font-display text-surface-700">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="text-center max-w-md bg-white rounded-2xl border border-surface-200 p-8 shadow-card">
          <p className="text-red-600 font-medium mb-2">Could not load products</p>
          <p className="text-surface-600 text-sm">{error}</p>
          <Link to="/" className="inline-block mt-4 text-brand-600 font-medium">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-surface-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="mb-10">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-surface-900">
            All products
          </h1>
          <p className="mt-2 text-surface-600 max-w-2xl">
            Browse all devices available on EMI. Select a product to see variants and choose a plan that fits your budget.
          </p>
          <p className="mt-4 text-sm text-surface-500">
            {products.length} product{products.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link
              key={p._id}
              to={`/products/${p.slug}`}
              className="group block bg-white rounded-2xl border border-surface-200 overflow-hidden shadow-card hover:shadow-cardHover hover:border-brand-200 transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-surface-100 overflow-hidden relative">
                {p.thumbnail ? (
                  <img
                    src={p.thumbnail}
                    alt={p.name}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <span className="font-display font-semibold text-surface-400 group-hover:text-brand-500 transition-colors">
                      {p.name}
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-500/90 text-white text-xs font-semibold">
                    EMI available
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h2 className="font-display font-semibold text-lg text-surface-900 group-hover:text-brand-600 transition-colors">
                  {p.name}
                </h2>
                <p className="text-sm text-surface-500 mt-1">
                  {p.variantCount} variant{p.variantCount !== 1 ? "s" : ""} · Multiple EMI plans
                </p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-brand-600 font-medium text-sm">
                  View plans
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
