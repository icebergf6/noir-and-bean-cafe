import React from 'react';

export default function JsonLdSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: 'NOIR & BEAN',
    alternateName: 'Noir and Bean Specialty Coffee Roastery',
    description: 'A modern premium café in Karawang designed for specialty coffee, artisan brunch, and slow moments.',
    url: 'https://noirandbean.com',
    telephone: '+6281234567890',
    priceRange: 'Rp 25.000 - Rp 95.000',
    servesCuisine: ['Specialty Coffee', 'Viennoiserie', 'Artisan Bakery', 'Modern Brunch'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Galuh Mas Raya, Telukjambe Timur',
      addressLocality: 'Karawang',
      addressRegion: 'Jawa Barat',
      postalCode: '41361',
      addressCountry: 'ID'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.3214,
      longitude: 107.2984
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '08:00',
        closes: '22:00'
      }
    ],
    menu: 'https://noirandbean.com/menu',
    acceptsReservations: 'True'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
