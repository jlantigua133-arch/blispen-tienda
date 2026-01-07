import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categoryImages = {
  skincare: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400',
  makeup: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400',
  haircare: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400',
  fragrance: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
  bodycare: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400'
};

const categoryLabels = {
  skincare: 'Skincare',
  makeup: 'Maquillaje',
  haircare: 'Cabello',
  fragrance: 'Fragancias',
  bodycare: 'Cuerpo'
};

export default function CategoryCard({ category }) {
  return (
    <Link to={`/products?category=${category}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer"
      >
        <img
          src={categoryImages[category]}
          alt={categoryLabels[category]}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-white text-xl font-semibold tracking-wide">
            {categoryLabels[category]}
          </h3>
          <p className="text-white/70 text-sm mt-1">Explorar →</p>
        </div>
      </motion.div>
    </Link>
  );
}
