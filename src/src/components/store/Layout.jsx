import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  Heart,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartDrawer from './CartDrawer';

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('blispen_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      const saved = localStorage.getItem('blispen_cart');
      setCart(saved ? JSON.parse(saved) : []);
    };
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) {
      removeFromCart(id);
      return;
    }
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCart(updated);
    localStorage.setItem('blispen_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const removeFromCart = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('blispen_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/products' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || currentPageName !== 'Home' ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Blispen
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors hover:text-rose-500 ${currentPageName === link.name ? 'text-rose-500' : 'text-gray-700'}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden md:flex rounded-full">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex rounded-full">
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-lg font-medium text-gray-700 hover:text-rose-500 transition-colors border-b"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="text-2xl font-bold">Blispen</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tu destino para productos de belleza premium y cuidado personal.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Comprar</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Skincare</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Maquillaje</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cabello</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fragancias</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Ayuda</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Envíos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Devoluciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
            © 2026 Blispen. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
