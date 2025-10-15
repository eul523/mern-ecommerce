import React from "react";
import useCartStore from "../stores/CartStore";
import { X, Plus, Minus, Trash2 } from "lucide-react";

export default function CartCard({ product }) {
  const { addOrIncrement, decrement, removeItem } = useCartStore();

  const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/${product.image}`;
  const price = Number(product.price ?? 0);
  const quantity = Number(product.quantity ?? 0);
  const total = price * quantity;

  const formatPrice = (v) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(v);

  // Mobile quantity setter using available increment/decrement actions.
  const handleMobileQuantityChange = (e) => {
    const newQty = Number(e.target.value);
    if (isNaN(newQty) || newQty < 1) return;
    const diff = newQty - quantity;
    if (diff > 0) {
      // call increment `diff` times (increment expects the product object)
      for (let i = 0; i < diff; i++) addOrIncrement(product);
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) decrement(product.productId);
    }
  };

  return (
    <>
      {/* ========== Desktop / tablet row (md and up) ========== */}
      <tr className="hidden md:table-row align-top transition-transform transform hover:scale-[1.003]">
        <td className="p-4">
          <div className="w-[150px] h-[150px] rounded-lg overflow-hidden shadow-md ring-1 ring-slate-200">
            <img
              src={imageUrl}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </td>

        <td className="p-4 max-w-[220px]">
          <p className="font-semibold text-slate-900 leading-tight truncate">{product.name}</p>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
        </td>

        <td className="p-4">
          <p className="font-medium">{formatPrice(price)}</p>
        </td>

        <td className="p-4">
          <div className="inline-flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-lg shadow-inner">
            <button
              aria-label={`decrease ${product.name}`}
              onClick={() => decrement(product.productId)}
              className="p-1 rounded-md hover:bg-slate-100 active:scale-95"
            >
              <Minus size={16} />
            </button>

            <span className="w-6 text-center font-medium">{quantity}</span>

            <button
              aria-label={`increase ${product.name}`}
              onClick={() => addOrIncrement(product)}
              className="p-1 rounded-md hover:bg-slate-100 active:scale-95"
            >
              <Plus size={16} />
            </button>
          </div>
        </td>

        <td className="p-4">
          <p className="font-medium">{formatPrice(total)}</p>
        </td>

        <td className="p-4">
          <button
            onClick={() => removeItem(product.productId)}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 ring-1 ring-red-100"
            aria-label={`remove ${product.name}`}
          >
            <Trash2 size={16} />
            <span className="text-sm font-medium">Remove</span>
          </button>
        </td>
      </tr>

      {/* ========== Mobile row (below md) ========== */}
      <tr className="table-row md:hidden">
        <td colSpan={6} className="p-3">
          <div className="flex gap-3 items-start bg-gradient-to-r from-white to-slate-50 rounded-xl p-3 shadow-lg ring-1 ring-slate-200">
            <div className="flex-shrink-0 w-[88px] h-[88px] rounded-lg overflow-hidden">
              <img src={imageUrl} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="font-semibold text-slate-900 truncate max-w-[180px]">
                    {/* shorten name on very small screens */}
                    {product.name.length > 40 ? product.name.slice(0, 37) + "..." : product.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{formatPrice(price)}</p>
                </div>

                <button
                  onClick={() => removeItem(product.productId)}
                  className="p-2 rounded-md hover:bg-slate-100" 
                  aria-label={`remove ${product.name}`}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Qty</span>

                  {/* On mobile we replace + / - with a compact select to change quantity */}
                  <select
                    aria-label={`set quantity for ${product.name}`}
                    value={quantity}
                    onChange={handleMobileQuantityChange}
                    className="appearance-none px-2 py-1 rounded-md border border-slate-200 text-sm shadow-sm"
                  >
                    {Array.from({ length: 10 }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium">Total</p>
                  <p className="font-semibold">{formatPrice(total)}</p>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      
    </>
  );
}
