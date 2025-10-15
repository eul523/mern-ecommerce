import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import useCartStore from "../stores/CartStore.js";

export default function AddToCartButton({ onClick, text, hideCart = false }) {
  const addOrIncrement = useCartStore((state) => state.addOrIncrement);

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 30px rgba(59,130,246,0.6)",
      }}
      className="relative flex items-center gap-2 px-6 py-3 rounded-2xl 
                 font-semibold text-white transition-all duration-300 
                 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 
                 shadow-[0_0_15px_rgba(59,130,246,0.5)] overflow-hidden w-fit"
    >

      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                       animate-[shimmer_2s_infinite]"></span>

      {!hideCart && <ShoppingCart className="w-5 h-5 relative z-10" />}

 
      <span className="relative z-10">{text}</span>

      <motion.div
        className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-xl"
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
}
