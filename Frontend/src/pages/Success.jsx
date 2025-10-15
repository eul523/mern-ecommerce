import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { useEffect } from "react";
import api from "../api";
import toast from "react-hot-toast";

export default function Success() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const completeOrder = async () => {
            const session_id = searchParams.get('session_id');
            if (!session_id) return navigate('/cancel');
            try {
                await api.post('/orders', { sessionId: session_id });
            } catch (err) {
                console.error("Failed to complete order:", err);
                toast.error(err.response?.data?.message || err.message || 'Failed to complete order');
                navigate('/cancel');
            }
        }
        completeOrder();
    }, [searchParams, navigate]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 text-center px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="bg-white rounded-full p-4 shadow-lg mb-6"
      >
        <CheckCircle size={80} className="text-green-600" />
      </motion.div>

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-extrabold text-slate-900 mb-3"
      >
        Payment Successful!
      </motion.h1>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-600 max-w-sm"
      >
        Your order has been confirmed. Thank you for shopping with us — your items are on their way! 🎉
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.05] active:scale-95 transition-all"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
}
