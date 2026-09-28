import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  tag: string;
  content: string;
  avatarColor: string;
}

const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Aditya Pratama',
    date: '3 days ago',
    rating: 5,
    tag: 'Solo Work & Pour Over',
    content: 'The coffee is exceptional. The Ethiopian V60 had crystal-clear bergamot notes and the mezzanine seating with fast fiber Wi-Fi made my 4-hour remote work session pure pleasure.',
    avatarColor: 'bg-[#C48B56]'
  },
  {
    id: 'r2',
    author: 'Clara & Michael',
    date: '1 week ago',
    rating: 5,
    tag: 'Weekend Date',
    content: 'The burnt cheesecake is hands down the best in West Java. Pair it with the Dirty Cream Coffee. The courtyard architecture feels straight out of Kyoto or Melbourne.',
    avatarColor: 'bg-[#28211E]'
  },
  {
    id: 'r3',
    author: 'Rina Kusuma',
    date: '2 weeks ago',
    rating: 5,
    tag: 'Morning Ritual',
    content: 'Finally a proper specialty roastery in Karawang! The baristas take real pride in extraction. Truffle mushroom croissant is flaky perfection.',
    avatarColor: 'bg-[#3E6B48]'
  }
];

export default function ReviewsSection() {
  return (
    <div className="space-y-10">
      {/* Rating Aggregate Bar */}
      <div className="bg-white border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-16 h-16 rounded-2xl bg-[#1A1412] text-[#F9F6F0] flex flex-col items-center justify-center font-bold">
            <span className="font-serif text-2xl leading-none text-[#C48B56]">4.9</span>
            <span className="text-[9px] uppercase tracking-wider text-[#A89F91]">OUT OF 5</span>
          </div>
          <div>
            <div className="flex text-[#C48B56] justify-center md:justify-start">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#C48B56" />
              ))}
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1412] mt-1">
              Guest Satisfaction Rating
            </h3>
            <p className="text-xs text-[#7A726D]">
              Verified evaluations from 1,248 patrons in Karawang
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#7A726D] border-t md:border-t-0 md:border-l border-[#E5DDD0] pt-4 md:pt-0 md:pl-8">
          <div>
            <span className="font-bold text-[#1A1412] block text-sm">99.2%</span>
            <span>Would Recommend</span>
          </div>
          <div>
            <span className="font-bold text-[#1A1412] block text-sm">98.5%</span>
            <span>Coffee Quality</span>
          </div>
          <div>
            <span className="font-bold text-[#1A1412] block text-sm">99.0%</span>
            <span>Acoustic Comfort</span>
          </div>
        </div>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-6 rounded-xl border border-[#E5DDD0] shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${rev.avatarColor} text-white flex items-center justify-center text-xs font-bold`}>
                    {rev.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1A1412]">{rev.author}</h4>
                    <span className="text-[10px] text-[#A89F91]">{rev.date}</span>
                  </div>
                </div>
                <div className="flex text-[#C48B56]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="#C48B56" />
                  ))}
                </div>
              </div>

              <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-[#F9F6F0] text-[#7A726D] rounded border border-[#E5DDD0]">
                {rev.tag}
              </span>

              <p className="text-xs text-[#7A726D] leading-relaxed italic">
                &ldquo;{rev.content}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-[#F2EDE4] flex items-center gap-1.5 text-[10px] text-[#3E6B48] font-semibold">
              <CheckCircle size={12} />
              <span>Verified Café Guest</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
