import { useEffect } from "react";

function formatPrice(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function CheckoutModal({ open, onClose, product, variant, plan }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div
        className="absolute inset-0 bg-surface-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-surface-200 animate-[fadeIn_0.2s_ease-out]">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h2 id="checkout-modal-title" className="font-display font-bold text-xl text-surface-900">
              Proceed to checkout
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 hover:text-surface-700 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex gap-4 p-4 rounded-xl bg-surface-50 border border-surface-100">
            <div className="w-20 h-20 rounded-lg bg-white border border-surface-200 overflow-hidden shrink-0">
              <img
                src={variant?.imageUrl}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display font-semibold text-surface-900 truncate">
                {product?.name}
              </p>
              <p className="text-sm text-surface-500">
                {variant?.variantLabel} · {variant?.finishName}
              </p>
              <p className="mt-1 font-semibold text-surface-900">
                {formatPrice(variant?.currentPrice)}
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl border border-brand-100 bg-brand-50">
            <p className="text-sm font-medium text-surface-600 mb-1">Selected EMI plan</p>
            <p className="font-display font-semibold text-surface-900">
              {formatPrice(plan?.monthlyAmount)} x {plan?.tenureMonths} months
            </p>
            <p className="text-sm text-surface-500 mt-0.5">
              {plan?.interestRate === 0 ? "0% interest" : `${plan?.interestRate}% interest`}
              {plan?.cashback > 0 && (
                <span className="text-emerald-600 font-medium ml-2">
                  · Cashback {formatPrice(plan?.cashback)}
                </span>
              )}
            </p>
          </div>

          <p className="mt-4 text-xs text-surface-500">
            You will be redirected to complete verification and payment. EMI will be debited monthly as per the plan.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-medium text-surface-700 bg-surface-100 hover:bg-surface-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="flex-1 py-3 rounded-xl font-display font-semibold text-white bg-brand-500 hover:bg-brand-600 transition-colors"
            >
              Confirm & continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
