import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Link } from "react-router";

export default function Cancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-red-100 text-center px-6">
      <motion.div
        initial={{ rotate: -45, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="bg-white rounded-full p-4 shadow-lg mb-6"
      >
        <XCircle size={80} className="text-red-600" />
      </motion.div>

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-extrabold text-slate-900 mb-3"
      >
        Payment Failed
      </motion.h1>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-600 max-w-sm"
      >
        Oops! Something went wrong with your payment. Don’t worry — your card wasn’t charged.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 space-x-4"
      >
        <Link
          to="/cart"
          className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.05] active:scale-95 transition-all"
        >
          Try Again
        </Link>

        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-xl bg-slate-100 text-slate-800 font-semibold shadow-sm hover:bg-slate-200 transition-all"
        >
          Back Home
        </Link>
      </motion.div>
    </div>
  );
}
