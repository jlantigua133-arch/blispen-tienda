import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, RefreshCw, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/store/HeroSection';
import ProductCard from '@/components/store/ProductCard';
import CategoryCard from '@/components/store/CategoryCard';
import products from '../data/products';

export default function Home() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('blispen_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('blispen_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const categories = ['skincare', 'makeup', 'haircare', 'fragrance', 'bodycare'];
  const features = [
    { icon: Truck, title: 'Envío Gratis', desc: 'En pedidos +$50' },
    { icon: Shield, title: 'Pago Seguro', desc: '100% protegido' },
    { icon: RefreshCw, title: 'Devoluciones', desc: '30 días gratis' },
    { icon: Headphones, title: 'Soporte 24/7', desc: 'Siempre disponibles' },
  ];

  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      {/* Features */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Explora por Categoría
            </h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              Encuentra los productos perfectos para tu rutina de belleza
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-rose-50/50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Productos Destacados
              </h2>
              <p className="text-gray-500 mt-3">
                Los favoritos de nuestros clientes
              </p>
            </div>
            <Link to="/products">
              <Button variant="ghost" className="group">
                Ver todos
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10 max-w-xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Únete a Blispen
              </h2>
              <p className="text-white/80 mt-4">
                Suscríbete y recibe un 10% de descuento en tu primera compra, además de ofertas exclusivas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 border border-white/30 focus:outline-none focus:border-white"
                />
                <Button className="bg-white text-rose-500 hover:bg-gray-100 rounded-full px-8 py-4 h-auto font-semibold">
                  Suscribirse
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
