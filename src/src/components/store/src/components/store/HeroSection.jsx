import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-white">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-rose-100">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-medium text-gray-700">Nueva Colección 2024</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-gray-900">Descubre tu</span>
            <br />
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              belleza natural
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md leading-relaxed">
            Productos premium de belleza y cuidado personal, formulados con los mejores ingredientes para realzar tu brillo natural.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products">
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-rose-500 text-white rounded-full px-8 h-14 text-base transition-all duration-300 group"
              >
                Explorar Productos
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-14 text-base border-2 hover:border-rose-500 hover:text-rose-500 transition-all duration-300"
            >
              Ver Ofertas
            </Button>
          </div>
          <div className="flex items-center gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold text-gray-900">50K+</p>
              <p className="text-sm text-gray-500">Clientes felices</p>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <p className="text-3xl font-bold text-gray-900">200+</p>
              <p className="text-sm text-gray-500">Productos</p>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <p className="text-3xl font-bold text-gray-900">4.9</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-2xl opacity-50" />
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600"
              alt="Beauty Products"
              className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
            />
            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -left-8 top-1/4 bg-white rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🌸</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">100% Natural</p>
                  <p className="text-xs text-gray-500">Ingredientes orgánicos</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -right-4 bottom-1/4 bg-white rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Cruelty Free</p>
                  <p className="text-xs text-gray-500">No testado en animales</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
