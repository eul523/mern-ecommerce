import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-white to-slate-50">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-[8rem] font-extrabold text-slate-800"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-slate-700 mt-2"
      >
        Page Not Found
      </motion.h2>

      <p className="text-slate-500 mt-3 max-w-md">
        Oops! The page you're looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-full hover:bg-indigo-700 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Go Back Home
      </Link>
    </div>
  );
}
