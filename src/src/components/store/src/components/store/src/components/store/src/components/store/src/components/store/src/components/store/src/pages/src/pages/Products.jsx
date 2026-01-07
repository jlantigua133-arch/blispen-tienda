import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/store/ProductCard';
import products from '../data/products';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('blispen_cart');
    return saved ? JSON.parse(saved) : [];
  });

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
    localStorage.setItem('blispen_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'makeup', label: 'Maquillaje' },
    { value: 'haircare', label: 'Cabello' },
    { value: 'fragrance', label: 'Fragancias' },
    { value: 'bodycare', label: 'Cuerpo' },
  ];

  const filteredProducts = products
    .filter(p => category === 'all' || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0; // newest por defecto
    });

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    if (newCategory === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', newCategory);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      {/* Header */}
      <div className="bg-white border-b sticky top-20 z-20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {category === 'all' ? 'Todos los Productos' : categories.find(c => c.value === category)?.label}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {filteredProducts.length} productos encontrados
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar productos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 rounded-full border-gray-200"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-200 bg-white"
              >
                <option value="newest">Más recientes</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>
          </div>
          {/* Category filters */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={category === cat.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(cat.value)}
                className={`rounded-full whitespace-nowrap ${
                  category === cat.value
                    ? 'bg-gray-900 text-white'
                    : 'hover:border-rose-500 hover:text-rose-500'
                }`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Products Grid */}
      <div className="container mx-auto px-6 py-10">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-rose-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">No se encontraron productos</h3>
            <p className="text-gray-500 mt-2">Intenta con otros filtros o términos de búsqueda</p>
            <Button
              variant="outline"
              className="mt-4 rounded-full"
              onClick={() => {
                setSearch('');
                handleCategoryChange('all');
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
