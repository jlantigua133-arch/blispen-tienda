import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Minus,
  Plus,
  ChevronLeft,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/store/ProductCard';
import products from '../data/products';

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  const product = products.find(p => p.id.toString() === productId);

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('blispen_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('blispen_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  }, [cart]);

  const addToCart = (prod, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === prod.id);
      if (exists) {
        return prev.map(item =>
          item.id === prod.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...prod, quantity: qty }];
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const categoryLabels = {
    skincare: 'Skincare',
    makeup: 'Maquillaje',
    haircare: 'Cabello',
    fragrance: 'Fragancias',
    bodycare: 'Cuerpo'
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Producto no encontrado</h2>
          <Link to="/products">
            <Button className="mt-4 rounded-full">Ver productos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">
        <Link
          to="/products"
          className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Volver a productos
        </Link>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50">
              <img
                src={product.image_url || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-rose-50 transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </motion.div>
          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <Badge className="bg-rose-100 text-rose-600 hover:bg-rose-100">
                {categoryLabels[product.category]}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < (product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-500">(128 reseñas)</span>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900">
              ${product.price?.toFixed(2)}
            </div>
            <p className="text-gray-600 leading-relaxed">
              {product.description || 'Producto premium de belleza formulado con ingredientes de alta calidad para resultados excepcionales. Ideal para todo tipo de piel.'}
            </p>
            {/* Quantity and Add to Cart */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button
                onClick={() => addToCart(product, quantity)}
                size="lg"
                className={`flex-1 rounded-full h-14 text-base transition-all duration-300 ${
                  addedToCart ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-900 hover:bg-rose-500'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    ¡Añadido al carrito!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Añadir al Carrito
                  </>
                )}
              </Button>
            </div>
            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-xs text-gray-600">Envío gratis +$50</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-xs text-gray-600">100% Original</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <RefreshCw className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-xs text-gray-600">30 días devolución</p>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
