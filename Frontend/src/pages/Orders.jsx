import {  useState } from "react";
import api from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Package, Loader2 } from "lucide-react";
import { useLoaderData } from "react-router";

export async function loader() {
    try{
        const res = await api.get('/orders');
        return {orders: res.data};
    }catch(err){
        return {err: err.message};
    }
}

export default function OrdersPage() {
  const {orders, err} = useLoaderData();
  const [expanded, setExpanded] = useState(null);
console.log(orders)
  if (err) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-600 font-semibold">Error: {err}</p>
      </div>
    );
  }


  if (!orders.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Package className="w-14 h-14 text-slate-400 mb-3" />
        <h2 className="text-xl font-semibold text-slate-800">No Orders Yet</h2>
        <p className="text-slate-500 mt-2">When you make a purchase, your orders will appear here.</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "shipped":
        return "bg-emerald-100 text-emerald-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "failed":
      case "cancelled":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">My Orders</h1>

      <div className="space-y-5">
        {orders.map((order, idx) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden"
          >
            <div
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 transition"
              onClick={() => setExpanded(expanded === order._id ? null : order._id)}
            >
              <div>
                <p className="font-semibold text-slate-800">Order #{order._id.slice(-6)}</p>
                <p className="text-sm text-slate-500">
                  {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-semibold text-slate-800">${order.total.toFixed(2)}</p>
                <ChevronDown
                  className={`transition-transform duration-300 ${expanded === order._id ? "rotate-180" : ""}`}
                />
              </div>
            </div>

            <AnimatePresence>
              {expanded === order._id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-slate-100 bg-slate-50/40 px-4 py-3"
                >
                  <ul className="divide-y divide-slate-200">
                    {order.products.map((p) => (
                      <li key={p.productId} className="py-2 flex justify-between text-sm text-slate-700">
                        <span>
                         {p.productId.name}
                        </span>
                        <span>
                          <span className="font-medium">Qty:</span> {p.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
