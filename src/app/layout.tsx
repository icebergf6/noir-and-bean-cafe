import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import StickyOrderBar from '@/components/layout/StickyOrderBar';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductModal from '@/components/menu/ProductModal';
import JsonLdSchema from '@/components/seo/JsonLdSchema';
import WhatsAppConcierge from '@/components/layout/WhatsAppConcierge';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NOIR & BEAN — Specialty Coffee & Slow Moments | Karawang',
  description: 'A modern premium café in Karawang designed for specialty coffee, artisan brunch, and slow moments. Order online and reserve your table.',
  keywords: ['Café Karawang', 'Specialty Coffee Karawang', 'Noir and Bean', 'Brunch Karawang', 'Coffee Roastery'],
  authors: [{ name: 'NOIR & BEAN' }],
  openGraph: {
    title: 'NOIR & BEAN — Specialty Coffee & Slow Moments',
    description: 'Experience specialty coffee and thoughtful food in Karawang, West Java.',
    url: 'https://noirandbean.com',
    siteName: 'NOIR & BEAN',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#F9F6F0] text-[#1A1412] antialiased selection:bg-[#C48B56]/30 selection:text-[#1A1412]">
        <CartProvider>
          {/* Main Global Layout Shell */}
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />

          {/* Persistent UX Overlays */}
          <CartDrawer />
          <ProductModal />
          <StickyOrderBar />
          <MobileBottomNav />
          <JsonLdSchema />
          <WhatsAppConcierge />
        </CartProvider>
      </body>
    </html>
  );
}
