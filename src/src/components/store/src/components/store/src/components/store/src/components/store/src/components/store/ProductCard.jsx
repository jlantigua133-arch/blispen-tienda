import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductCard({ product, onAddToCart }) {
  const categoryLabels = {
    skincare: 'Skincare',
    makeup: 'Maquillaje',
    haircare: 'Cabello',
    fragrance: 'Fragancias',
    bodycare: 'Cuerpo'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <Link to={`/product?id=${product.id}`}>
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50">
          <img
            src={product.image_url || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </Link>
      <div className="p-5">
        <span className="text-xs font-medium tracking-widest text-rose-400 uppercase">
          {categoryLabels[product.category] || product.category}
        </span>
        <Link to={`/product?id=${product.id}`}>
          <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-rose-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < (product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.price?.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            className="bg-gray-900 hover:bg-rose-500 text-white rounded-full px-4 transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4 mr-1" />
            Añadir
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
