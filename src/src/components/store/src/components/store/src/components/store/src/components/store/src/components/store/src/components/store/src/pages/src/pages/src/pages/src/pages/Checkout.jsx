import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  Check,
  Loader2,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function Checkout() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('blispen_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    city: '',
    postal_code: ''
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const itemsText = cart.map(item =>
      `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const message = `Nuevo pedido de Blispen\n\n` +
      `Nombre: ${formData.customer_name}\n` +
      `Email: ${formData.customer_email}\n` +
      `Teléfono: ${formData.customer_phone}\n\n` +
      `Dirección de envío:\n${formData.shipping_address}\n${formData.city}, ${formData.postal_code}\n\n` +
      `Productos:\n${itemsText}\n\n` +
      `Subtotal: $${subtotal.toFixed(2)}\n` +
      `Envío: ${shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}\n` +
      `TOTAL: $${total.toFixed(2)}`;

    // CAMBIA AQUÍ TU NÚMERO DE WHATSAPP (con código de país, sin + ni espacios)
    const whatsappNumber = "34600123456"; // <-- PON TU NÚMERO AQUÍ
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');

    // Limpia el carrito
    localStorage.removeItem('blispen_cart');
    window.dispatchEvent(new Event('cart-updated'));
    setOrderComplete(true);
    setIsSubmitting(false);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-green-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900">¡Pedido Enviado!</h1>
          <p className="text-gray-600 mt-3">
            Te hemos abierto WhatsApp con todos los detalles del pedido.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Te contactaremos pronto para confirmar pago y envío.
          </p>
          <Link to="/">
            <Button className="w-full mt-6 bg-gray-900 hover:bg-rose-500 rounded-full h-12">
              Volver al inicio
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-10 h-10 text-rose-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Tu carrito está vacío</h2>
          <p className="text-gray-500 mt-2">Agrega algunos productos para continuar</p>
          <Link to="/products">
            <Button className="mt-6 bg-gray-900 hover:bg-rose-500 rounded-full">
              Ver productos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white py-10">
      <div className="container mx-auto px-6">
        <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Seguir comprando
        </Link>
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-rose-600 text-sm font-bold">1</span>
                  </div>
                  Información de contacto
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer_name">Nombre completo</Label>
                    <Input id="customer_name" name="customer_name" value={formData.customer_name} onChange={handleChange} required className="rounded-xl" placeholder="María García" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer_email">Email</Label>
                    <Input id="customer_email" name="customer_email" type="email" value={formData.customer_email} onChange={handleChange} required className="rounded-xl" placeholder="maria@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer_phone">Teléfono</Label>
                  <Input id="customer_phone" name="customer_phone" value={formData.customer_phone} onChange={handleChange} className="rounded-xl" placeholder="+34 600 000 000" />
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-rose-600 text-sm font-bold">2</span>
                  </div>
                  Dirección de envío
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="shipping_address">Dirección</Label>
                  <Input id="shipping_address" name="shipping_address" value={formData.shipping_address} onChange={handleChange} required className="rounded-xl" placeholder="Calle Principal 123" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} required className="rounded-xl" placeholder="Madrid" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal_code">Código Postal</Label>
                    <Input id="postal_code" name="postal_code" value={formData.postal_code} onChange={handleChange} required className="rounded-xl" placeholder="28001" />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-rose-500 h-14 rounded-full text-base transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Enviar Pedido por WhatsApp - ${total.toFixed(2)}
                  </>
                )}
              </Button>
            </form>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Resumen del Pedido</h2>
              <div className="space-y-4 max-h-64 overflow-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image_url || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-gray-500 text-sm">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    Envío
                  </span>
                  <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Compra 100% Segura</p>
                  <p className="text-xs text-green-600 mt-1">
                    Tus datos están protegidos
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
