import React from "react";
import CartCard from "../components/CartCard";
import useCartStore from "../stores/CartStore.js";
import StylishButton from '../components/StylishButton.jsx';

export default function Cart() {
    const { items, getTotal, increment, decrement, removeItem } = useCartStore();

    const totalAmount = getTotal();

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-800">Your Cart</h1>

            {/* ========== Desktop table (hidden on mobile) ========== */}
            <div className="hidden md:block overflow-x-auto rounded-xl shadow ring-1 ring-slate-200 bg-white">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="bg-slate-50 text-slate-600 text-sm">
                            <th className="p-3 font-semibold">Product</th>
                            <th className="p-3 font-semibold">Title</th>
                            <th className="p-3 font-semibold">Price</th>
                            <th className="p-3 font-semibold">Quantity</th>
                            <th className="p-3 font-semibold">Total</th>
                            <th className="p-3 font-semibold">Remove</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.length > 0 ? (
                            items.map((item) => <CartCard key={item.productId} product={item} />)
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-6 text-center text-slate-500">
                                    Your cart is empty.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ========== Mobile view (cards) ========== */}
            <div className="md:hidden space-y-4">
                {items.length > 0 ? (
                    items.map((item) => {
                        const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/${item.image}`;
                        const price = Number(item.price ?? 0);
                        const quantity = Number(item.quantity ?? 0);
                        const total = price * quantity;
                        const formatPrice = (v) =>
                            new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(v);

                        return (
                            <div key={item.productId} className="bg-white rounded-xl shadow ring-1 ring-slate-200 p-3 flex gap-3 items-start">
                                <div className="flex-shrink-0 w-[88px] h-[88px] rounded-lg overflow-hidden">
                                    <img src={imageUrl} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <p className="font-semibold text-slate-900 truncate max-w-[180px]">
                                                {item.name.length > 40 ? item.name.slice(0, 37) + "..." : item.name}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">{formatPrice(price)}</p>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.productId)}
                                            className="p-2 rounded-md hover:bg-slate-100"
                                            aria-label={`remove ${item.name}`}
                                        >
                                            {/* simple X markup so lucide isn't required here */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        </button>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-500">Qty</span>

                                            <select
                                                aria-label={`set quantity for ${item.name}`}
                                                value={quantity}
                                                onChange={(e) => {
                                                    const newQty = Number(e.target.value);
                                                    if (isNaN(newQty) || newQty < 1) return;
                                                    const diff = newQty - quantity;
                                                    if (diff > 0) {
                                                        for (let i = 0; i < diff; i++) increment(item);
                                                    } else if (diff < 0) {
                                                        for (let i = 0; i < Math.abs(diff); i++) decrement(item.productId);
                                                    }
                                                }}
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
                        );
                    })
                ) : (
                    <div className="text-center py-12 text-slate-500 bg-white rounded-xl shadow ring-1 ring-slate-200">
                        Your cart is empty.
                    </div>
                )}

                {items.length > 0 && (
                    <div className="mt-6 bg-white rounded-xl shadow ring-1 ring-slate-200 p-4 flex justify-between items-center">
                        <span className="font-semibold text-slate-700">Total:</span>
                        <span className="font-bold text-slate-900 text-lg">${totalAmount.toFixed(2)}</span>
                    </div>
                )}
            </div>

            {/* === Checkout Summary Section === */}
            <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-lg ring-1 ring-slate-200 p-6 space-y-4">
                <h2 className="text-xl font-bold text-slate-800 border-b pb-3">Order Summary</h2>

                <div className="flex justify-between text-slate-700 text-sm">
                    <span>Subtotal</span>
                    <span>${getTotal().toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-700 text-sm">
                    <span>Shipping Fee</span>
                    <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="border-t pt-3 flex justify-between text-lg font-bold text-slate-900">
                    <span>Total</span>
                    <span>${getTotal().toFixed(2)}</span>
                </div>

                <StylishButton hideCart={true} text="🔥 Proceed to Checkout" onClick={() => alert('Proceeding to checkout...')} className="w-full text-center" />
                    
            </div>

        </div>
    );
}
