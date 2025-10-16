import { useRouteError, Link } from "react-router";
import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";

export default function ErrorElement() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-white to-slate-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <AlertTriangle className="w-16 h-16 text-amber-500 mb-3" />
        <h1 className="text-3xl font-bold text-slate-800 mb-1">Something went wrong</h1>
        <p className="text-slate-500 max-w-md">
          {error?.statusText || error?.message || "An unexpected error occurred. Please try again later."}
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-full hover:bg-indigo-700 transition"
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
