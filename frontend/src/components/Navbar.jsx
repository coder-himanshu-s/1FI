import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isProducts = location.pathname === "/products" || location.pathname.startsWith("/products/");

  return (
    <nav className="sticky top-0 z-50 border-b border-surface-200/80 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-xl text-surface-900 hover:text-brand-600 transition-colors"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-500 text-white text-sm">
              1Fi
            </span>
            <span>1Fi EMI</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isHome
                  ? "bg-brand-50 text-brand-700"
                  : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`hidden sm:inline-flex px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isProducts
                  ? "bg-brand-50 text-brand-700"
                  : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
              }`}
            >
              Products
            </Link>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              EMI available
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
