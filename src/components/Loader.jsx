import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <motion.div
        className="h-12 w-12 rounded-full border-4 border-white/20 border-t-[#f13a34]"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default Loader;
