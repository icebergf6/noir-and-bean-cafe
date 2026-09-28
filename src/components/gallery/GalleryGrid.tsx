'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Heart, MessageCircle, Camera } from 'lucide-react';

export type GalleryCategory = 'ALL' | 'COFFEE' | 'FOOD' | 'SPACE' | 'PEOPLE' | 'EVENTS';

export interface GalleryPhoto {
  id: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  caption: string;
  likes: number;
  comments: number;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g1',
    category: 'COFFEE',
    src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
    alt: 'Single Origin Pour Over Extraction',
    caption: 'Dialing in Ethiopian Yirgacheffe on the morning bar.',
    likes: 248,
    comments: 18
  },
  {
    id: 'g2',
    category: 'FOOD',
    src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop',
    alt: 'Fresh Butter Croissants',
    caption: 'Batch one out of the deck oven at 07:30 sharp.',
    likes: 382,
    comments: 29
  },
  {
    id: 'g3',
    category: 'SPACE',
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
    alt: 'Architectural Café Interior with Teak Tables',
    caption: 'Soft afternoon shadows across our Karawang courtyard.',
    likes: 512,
    comments: 44
  },
  {
    id: 'g4',
    category: 'PEOPLE',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop',
    alt: 'Collaborative discussion over artisan coffees',
    caption: 'Slow mornings turned into meaningful brainstorming sessions.',
    likes: 196,
    comments: 14
  },
  {
    id: 'g5',
    category: 'EVENTS',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop',
    alt: 'Sensory Cupping Workshop',
    caption: 'Monthly community cupping tasting 6 regional Indonesian micro-lots.',
    likes: 310,
    comments: 26
  },
  {
    id: 'g6',
    category: 'FOOD',
    src: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop',
    alt: 'Burnt Cheesecake Slice',
    caption: 'Caramelized crust, molten core. Our San Sebastián recipe.',
    likes: 640,
    comments: 52
  }
];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('ALL');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const categories: GalleryCategory[] = ['ALL', 'COFFEE', 'FOOD', 'SPACE', 'PEOPLE', 'EVENTS'];

  const filtered = activeCategory === 'ALL'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all shrink-0 ${
              activeCategory === cat
                ? 'bg-[#1A1412] text-white'
                : 'bg-white border border-[#E5DDD0] text-[#7A726D] hover:border-[#1A1412]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        {filtered.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative aspect-square bg-[#F2EDE4] rounded-xl overflow-hidden cursor-pointer shadow-sm border border-[#E5DDD0]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {/* Hover overlay with social stats */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md px-2 py-0.5 rounded self-start">
                {photo.category}
              </span>
              <div>
                <p className="text-xs line-clamp-2 text-[#F2EDE4] font-medium">{photo.caption}</p>
                <div className="flex items-center gap-4 mt-2 text-xs font-semibold">
                  <span className="flex items-center gap-1"><Heart size={14} fill="currentColor" /> {photo.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={14} fill="currentColor" /> {photo.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Social Follow banner */}
      <div className="text-center pt-4">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1412] hover:bg-[#C48B56] text-white text-xs font-bold tracking-widest uppercase rounded-full transition-colors"
        >
          <Camera size={16} />
          <span>FOLLOW @NOIRANDBEAN ON INSTAGRAM</span>
        </a>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1A1412] text-white rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Photo View */}
            <div className="relative min-h-[300px] md:min-h-[500px] flex-1 bg-black">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 650px"
              />
            </div>

            {/* Details sidebar */}
            <div className="p-6 md:w-80 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C48B56] text-[#1A1412] flex items-center justify-center font-bold text-xs">
                    NB
                  </div>
                  <div>
                    <p className="font-bold text-xs text-white">noirandbean</p>
                    <p className="text-[10px] text-[#A89F91]">Karawang Sanctuary</p>
                  </div>
                </div>

                <p className="text-xs text-[#D4C9BC] leading-relaxed pt-2">
                  {selectedPhoto.caption}
                </p>

                <div className="flex items-center gap-4 text-xs text-[#A89F91] pt-3 border-t border-white/10">
                  <span className="flex items-center gap-1 text-[#C48B56]"><Heart size={14} fill="currentColor" /> {selectedPhoto.likes} likes</span>
                  <span className="flex items-center gap-1"><MessageCircle size={14} /> {selectedPhoto.comments} comments</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-[#A89F91] block">Tagged in #SlowMoments</span>
                <span className="text-xs font-semibold text-white">NOIR & BEAN Coffee Roastery</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
