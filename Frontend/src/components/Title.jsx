// components/LatestArrivalsTitle.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Title = ({title}) => {
  // Animation variants for the title
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Animation variants for the underline
  const underlineVariants = {
    hidden: { width: '0%' },
    visible: {
      width: '100%',
      transition: { duration: 0.8, ease: 'easeInOut', delay: 0.3 },
    },
    hover: {
      scaleX: 1.1,
      boxShadow: '0 0 8px rgba(75, 85, 99, 0.5)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex justify-center items-center my-8">
      <motion.div
        className="relative group"
        initial="hidden"
        animate="visible"
        variants={titleVariants}
      >
        <h1
          className="
            text-4xl md:text-5xl font-bold
            bg-gradient-to-r from-gray-700 via-gray-500 to-gray-800
            text-transparent bg-clip-text
            uppercase tracking-wide
            relative
            hover:opacity-90
            transition-opacity duration-300
          "
        >
          {title}
        </h1>
        {/* Dynamic Underline */}
        <motion.span
          className="
            absolute -bottom-1 left-0 h-0.5
            bg-gradient-to-r from-gray-600 to-gray-400
            rounded-full
          "
          variants={underlineVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        ></motion.span>
      </motion.div>
    </div>
  );
};

export default Title;