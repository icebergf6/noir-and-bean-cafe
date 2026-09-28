'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Coffee, ShoppingBag, Calendar, UserCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  const navItems = [
    { label: 'HOME', href: '/', icon: Home },
    { label: 'MENU', href: '/menu', icon: Coffee },
    { label: 'ORDER', href: '/order', icon: ShoppingBag },
    { label: 'RESERVE', href: '/reservation', icon: Calendar },
    { label: 'ADMIN', href: '/admin', icon: UserCheck }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1A1412] border-t border-[#2D2420] px-2 py-2 safe-area-bottom shadow-2xl">
      <div className="grid grid-cols-5 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                isActive ? 'text-[#C48B56]' : 'text-[#A89F91] hover:text-[#F9F6F0]'
              }`}
            >
              <div className="relative">
                <Icon size={20} />
                {item.label === 'ORDER' && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#C48B56] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-bold tracking-wider mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
