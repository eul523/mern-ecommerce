// components/HeaderNav.jsx
import { NavLink } from 'react-router';
import { motion } from 'framer-motion';

const HeaderNav = ({showOrders = false}) => {
  // Animation variants for nav items
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Staggered entrance
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.05,
      color: '#1F2937', // gray-800
      transition: { duration: 0.2 },
    },
  };

  // Animation variants for the underline
  const underlineVariants = {
    hidden: { width: '0%' },
    visible: { width: '100%' },
    hover: {
      width: '100%',
      backgroundColor: '#4B5563', // gray-600
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/category/men', label: 'Collections' },
    { to: '/about', label: 'About' },
  ];
  if (showOrders) {
    navLinks.push({ to: '/orders', label: 'Orders' });
  }

  return (
    <div className="sm:text-lg font-medium flex items-center sm:gap-6 md:gap-8">
      {navLinks.map((link, index) => (
        <motion.div
          key={link.to}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={navItemVariants}
          whileHover="hover"
          className="relative"
        >
          <NavLink to={link.to}>
            {({ isActive }) => (
              <>
                <span
                  className={`relative px-2 py-1 transition-colors duration-300 ${
                    (isActive || (link.label === 'Collections' && window.location.pathname.startsWith('/category')))
                      ? 'text-gray-800 font-semibold'
                      : 'text-gray-700 hover:text-gray-800'
                  }`}
                >
                  {link.label}
                </span>
                {/* Dynamic Underline */}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-gray-500 rounded-full"
                  initial="hidden"
                  animate={(isActive || (link.label === 'Collections' && window.location.pathname.startsWith('/category'))) ? 'visible' : 'hidden'}
                  variants={underlineVariants}
                />
              </>
            )}
          </NavLink>
        </motion.div>
      ))}
    </div>
  );
};

export default HeaderNav;
