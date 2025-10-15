// components/ScrollIndicator.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator = () => {
  // Animation variants for the scroll indicator text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.5 },
    },
  };

  // Animation variants for the arrow
  const arrowVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 10,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <motion.div
      className="absolute bottom-8 flex flex-col items-center gap-2"
      initial="hidden"
      animate="visible"
      variants={textVariants}
    >
      <motion.span
        className="text-gray-600 text-lg font-medium tracking-wide"
        variants={textVariants}
      >
        New Arrivals
      </motion.span>
      <motion.div
        className="flex flex-col items-center"
        variants={arrowVariants}
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;