import { motion } from "framer-motion";
import { Sparkles, Shirt, Heart, ShoppingBag } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-slate-800 mb-6"
      >
        About <span className="text-pink-500">Us</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12"
      >
        Welcome to <span className="font-semibold text-slate-800">Cartify</span> —
        where fashion meets comfort. We believe that clothing isn’t just fabric;
        it’s an expression of who you are. Our mission is to deliver stylish,
        high-quality apparel for men, women, and kids that feels as good as it looks.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <Shirt className="mx-auto text-pink-500 w-10 h-10 mb-4" />
          <h3 className="font-semibold text-lg text-slate-800 mb-2">Quality First</h3>
          <p className="text-slate-600 text-sm">
            Each piece is crafted with premium materials and attention to detail,
            ensuring style that lasts season after season.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <Heart className="mx-auto text-pink-500 w-10 h-10 mb-4" />
          <h3 className="font-semibold text-lg text-slate-800 mb-2">Made with Love</h3>
          <p className="text-slate-600 text-sm">
            From design to delivery, every step is guided by passion for fashion,
            comfort, and confidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <ShoppingBag className="mx-auto text-pink-500 w-10 h-10 mb-4" />
          <h3 className="font-semibold text-lg text-slate-800 mb-2">For Everyone</h3>
          <p className="text-slate-600 text-sm">
            Whether it’s casual wear for kids, statement pieces for women, or classics for men —
            we’ve got something for every story.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 bg-pink-100 rounded-2xl py-10 px-6"
      >
        <Sparkles className="w-8 h-8 text-pink-600 mx-auto mb-3" />
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">
          Our Promise
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
          At Cartify, we’re committed to blending fashion and function. We want
          you to feel empowered every time you wear our designs — because when
          you look good, you feel unstoppable.
        </p>
      </motion.div>
    </div>
  );
}
