import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/products";

function HomePage() {
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
      <div className="min-h-[60vh] flex items-center justify-center">
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
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-surface-900 via-surface-800 to-brand-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/90 text-white text-sm font-semibold mb-6">
              EMI backed by mutual funds
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Shop now. Pay in easy EMIs.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-surface-300">
              Get the latest smartphones and gadgets with flexible monthly plans. Choose your tenure, enjoy zero or low interest, and earn cashback on every purchase.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-display font-semibold shadow-lg shadow-brand-500/30 transition-all hover:shadow-brand-500/40"
              >
                Browse products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-surface-500 text-surface-200 hover:bg-white/10 hover:border-surface-400 font-medium transition-all"
              >
                How it works
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-50 to-transparent" />
      </section>

      <section id="how-it-works" className="py-16 sm:py-20 bg-white border-b border-surface-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-surface-900">
              How 1Fi EMI works
            </h2>
            <p className="mt-4 text-surface-600">
              Simple, transparent, and designed to make high-value purchases stress-free.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-surface-50 border border-surface-100 hover:border-brand-200 hover:shadow-card transition-all">
              <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-100 text-brand-600 font-display font-bold text-xl">
                1
              </span>
              <h3 className="mt-4 font-display font-semibold text-lg text-surface-900">Choose a product</h3>
              <p className="mt-2 text-sm text-surface-600">
                Pick from smartphones and more. Each product has multiple variants and finishes.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-surface-50 border border-surface-100 hover:border-brand-200 hover:shadow-card transition-all">
              <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-100 text-brand-600 font-display font-bold text-xl">
                2
              </span>
              <h3 className="mt-4 font-display font-semibold text-lg text-surface-900">Select EMI plan</h3>
              <p className="mt-2 text-sm text-surface-600">
                Choose tenure from 3 to 60 months. Many plans have 0% interest and cashback.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-surface-50 border border-surface-100 hover:border-brand-200 hover:shadow-card transition-all">
              <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-100 text-brand-600 font-display font-bold text-xl">
                3
              </span>
              <h3 className="mt-4 font-display font-semibold text-lg text-surface-900">Complete checkout</h3>
              <p className="mt-2 text-sm text-surface-600">
                Proceed with your selected plan. Quick verification and you are done.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-surface-50 border border-surface-100 hover:border-brand-200 hover:shadow-card transition-all">
              <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-100 text-brand-600 font-display font-bold text-xl">
                4
              </span>
              <h3 className="mt-4 font-display font-semibold text-lg text-surface-900">Pay monthly</h3>
              <p className="mt-2 text-sm text-surface-600">
                EMIs are backed by mutual funds. Pay on time and build a habit of saving.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-surface-900">
                Featured products
              </h2>
              <p className="mt-2 text-surface-600">
                Latest devices with flexible EMI plans. Click to view variants and choose your plan.
              </p>
            </div>
            <span className="text-sm text-surface-500">
              {products.length} product{products.length !== 1 ? "s" : ""} available
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                <div className="p-5 sm:p-6">
                  <h3 className="font-display font-semibold text-lg text-surface-900 group-hover:text-brand-600 transition-colors">
                    {p.name}
                  </h3>
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
      </section>

      <section className="py-16 sm:py-20 bg-white border-t border-surface-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center rounded-3xl bg-gradient-to-br from-brand-50 to-surface-50 border border-brand-100 p-10 sm:p-14">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-surface-900">
              Ready to get started?
            </h2>
            <p className="mt-4 text-surface-600">
              Explore our range of products and find an EMI plan that fits your budget. No hidden fees, transparent terms.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-display font-semibold transition-colors"
            >
              View all products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
