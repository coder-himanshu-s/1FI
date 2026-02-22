import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductBySlug } from "../api/products";
import CheckoutModal from "../components/CheckoutModal";

function formatPrice(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

const FINISH_COLORS = {
  Orange: "#ea751a",
  Blue: "#1e3a5f",
  "Natural Titanium": "#a8a29e",
  "Titanium Black": "#1c1917",
  "Titanium Gray": "#78716c",
  Obsidian: "#1c1917",
  Porcelain: "#f5f5f4",
  "Silicium Black": "#1c1917",
  "Flowing Emerald": "#059669",
  White: "#f8fafc",
  "Dark Grey": "#475569",
  Black: "#1c1917",
  "Jade Green": "#10b981",
  "Stargaze Blue": "#3b82f6",
  "Sunset Orange": "#ea751a",
  "Silver Shadow": "#cbd5e1",
  Mint: "#6ee7b7",
  Graphite: "#475569",
};

function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [variantIndex, setVariantIndex] = useState(0);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProductBySlug(slug)
      .then((data) => {
        setProduct(data);
        setVariantIndex(0);
        setSelectedPlanIndex(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
          <p className="font-display text-surface-700">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="text-center max-w-md bg-white rounded-2xl border border-surface-200 p-8 shadow-card">
          <p className="text-red-600 font-medium mb-2">
            {error || "Product not found"}
          </p>
          <Link
            to="/"
            className="inline-block mt-4 text-brand-600 hover:text-brand-700 font-medium"
          >
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

  const variant = product.variants[variantIndex];
  const emiPlans = variant?.emiPlans || [];

  return (
    <div className="bg-gradient-to-b from-surface-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-surface-500 mb-6">
          <Link to="/" className="hover:text-surface-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-surface-900 transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-surface-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-surface-200 shadow-card overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-10">
            <div>
              <div className="relative inline-flex items-center gap-2 flex-wrap">
                {product.isNew && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-red-500 text-white text-xs font-bold">
                    NEW
                  </span>
                )}
                <h1 className="font-display font-bold text-2xl lg:text-3xl text-surface-900">
                  {product.name}
                </h1>
              </div>
              <p className="text-surface-600 mt-1">{variant.variantLabel}</p>
              <div className="mt-6 aspect-square max-w-md rounded-2xl bg-surface-50 overflow-hidden border border-surface-100">
                <img
                  src={variant.imageUrl}
                  alt={`${product.name} ${variant.finishName}`}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <p className="text-sm text-surface-500 mt-4">
                Available in {product.variants.length} finish
                {product.variants.length !== 1 ? "es" : ""}
              </p>
              <div className="flex gap-3 mt-2 flex-wrap">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setVariantIndex(i);
                      setSelectedPlanIndex(null);
                    }}
                    className={`w-10 h-10 rounded-full border-2 transition-all shrink-0 ${
                      i === variantIndex
                        ? "border-brand-500 ring-2 ring-brand-200 scale-110"
                        : "border-surface-300 hover:border-surface-400"
                    }`}
                    style={{
                      backgroundColor:
                        FINISH_COLORS[v.finishName] ||
                        (v.finishName.toLowerCase().includes("black") ||
                        v.finishName.toLowerCase().includes("obsidian")
                          ? "#1c1917"
                          : v.finishName.toLowerCase().includes("gray") ||
                            v.finishName.toLowerCase().includes("titanium")
                            ? "#78716c"
                            : "#f5f5f4"),
                    }}
                    title={v.finishName}
                    aria-label={`Select ${v.finishName}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-3 flex-wrap">
                <p className="font-display font-bold text-3xl lg:text-4xl text-surface-900">
                  {formatPrice(variant.currentPrice)}
                </p>
                {variant.mrp > variant.currentPrice && (
                  <p className="text-surface-500 line-through text-lg">
                    {formatPrice(variant.mrp)}
                  </p>
                )}
              </div>
              <p className="text-surface-600 mt-4 font-medium flex items-center gap-2">
                <span className="inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                {product.tagline}
              </p>

              <div className="mt-6 flex-1 min-h-0">
                <p className="text-sm font-semibold text-surface-800 mb-3">
                  Select EMI plan
                </p>
                <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                  {emiPlans.map((plan, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedPlanIndex(i)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        selectedPlanIndex === i
                          ? "border-brand-500 bg-brand-50"
                          : "border-surface-200 hover:border-brand-100 bg-white"
                      }`}
                    >
                      <span className="font-display font-semibold text-surface-900">
                        {formatPrice(plan.monthlyAmount)} x {plan.tenureMonths}{" "}
                        months
                      </span>
                      <span className="block text-sm text-surface-500 mt-0.5">
                        {plan.interestRate === 0
                          ? "0% interest"
                          : `${plan.interestRate}% interest`}
                      </span>
                      {plan.cashback > 0 && (
                        <span className="inline-block text-sm text-emerald-600 font-medium mt-1">
                          Additional cashback of {formatPrice(plan.cashback)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                disabled={selectedPlanIndex === null}
                onClick={() => selectedPlanIndex !== null && setCheckoutOpen(true)}
                className="mt-6 w-full py-4 rounded-xl font-display font-semibold text-white bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-brand-500/25"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        product={product}
        variant={variant}
        plan={selectedPlanIndex !== null ? emiPlans[selectedPlanIndex] : null}
      />
    </div>
  );
}

export default ProductPage;
