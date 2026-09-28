import { Product } from '@/types/product';

export const PRODUCTS: Product[] = [
  {
    id: 'noir-latte',
    name: 'Noir Latte',
    category: 'SIGNATURE',
    description: 'Double ristretto extracted over artisanal dark palm nectar, infused with velvety steamed oat milk and finished with sea salt crystal.',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop',
    tags: ['DAIRY FREE', 'CHEF PICK'],
    available: true,
    bestseller: true,
    calories: 185,
    preparationTime: '4-6 mins',
    customization: {
      milk: ['Full Cream', 'Oat Milk (+Rp 8.000)', 'Almond Milk (+Rp 8.000)'],
      sugar: ['Normal Sugar', 'Less Sugar', 'No Sugar'],
      ice: ['Normal Ice', 'Less Ice', 'No Ice', 'Hot'],
      size: ['Regular', 'Large (+Rp 6.000)']
    }
  },
  {
    id: 'dirty-cream-coffee',
    name: 'Dirty Cream Coffee',
    category: 'SIGNATURE',
    description: 'Concentrated hot double shot poured slowly over dense, chilled Madagascar vanilla sweet cream and cold whole milk.',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1000&auto=format&fit=crop',
    tags: ['CHEF PICK'],
    available: true,
    bestseller: true,
    calories: 230,
    preparationTime: '5 mins',
    customization: {
      sugar: ['Normal Sugar', 'Less Sugar'],
      ice: ['Normal Ice', 'Less Ice'],
      size: ['Regular', 'Large (+Rp 6.000)']
    }
  },
  {
    id: 'burnt-cheesecake',
    name: 'San Sebastián Burnt Cheesecake',
    category: 'DESSERT',
    description: 'Traditional Basque recipe baked at high temperature with deeply caramelized exterior and rich, molten cream cheese center.',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop',
    tags: ['VEGETARIAN', 'CHEF PICK'],
    available: true,
    bestseller: true,
    calories: 380,
    preparationTime: 'Ready to serve'
  },
  {
    id: 'truffle-mushroom-croissant',
    name: 'Truffle Mushroom Croissant',
    category: 'FOOD',
    description: 'Crisp French butter laminated croissant filled with sautéed portobello, shiitake, melted Swiss Emmental, and white truffle essence.',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop',
    tags: ['VEGETARIAN', 'CHEF PICK'],
    available: true,
    bestseller: true,
    calories: 410,
    preparationTime: '8-10 mins'
  },
  {
    id: 'matcha-cloud',
    name: 'Ceremonial Matcha Cloud',
    category: 'NON-COFFEE',
    description: 'First-harvest Uji ceremonial grade green tea whisked tableside over chilled organic milk and topped with sea-salt cream cloud.',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=1000&auto=format&fit=crop',
    tags: ['LOW SUGAR', 'VEGETARIAN'],
    available: true,
    bestseller: true,
    calories: 160,
    preparationTime: '5 mins',
    customization: {
      milk: ['Full Cream', 'Oat Milk (+Rp 8.000)', 'Almond Milk (+Rp 8.000)'],
      sugar: ['Normal Sugar', 'Less Sugar', 'No Sugar'],
      ice: ['Normal Ice', 'Less Ice', 'Hot']
    }
  },
  {
    id: 'smoked-beef-sandwich',
    name: 'Smoked Beef Brisket Sandwich',
    category: 'FOOD',
    description: '14-hour hardwood-smoked beef brisket, house pickled gherkins, Dijon aioli, and aged cheddar toasted on country sourdough.',
    price: 62000,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000&auto=format&fit=crop',
    tags: ['CHEF PICK'],
    available: true,
    bestseller: true,
    calories: 540,
    preparationTime: '10-12 mins'
  },
  {
    id: 'single-origin-pour-over',
    name: 'Single Origin V60 Filter',
    category: 'COFFEE',
    description: 'Rotating micro-lot beans (Ethiopia Yirgacheffe & Aceh Gayo Anaerobic) extracted via Hario V60 with delicate notes of jasmine and stone fruit.',
    price: 36000,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
    tags: ['LOW SUGAR'],
    available: true,
    bestseller: false,
    calories: 5,
    preparationTime: '6-8 mins',
    customization: {
      ice: ['Hot', 'Normal Ice']
    }
  },
  {
    id: 'spanish-cinnamon-latte',
    name: 'Spanish Cinnamon Cortado',
    category: 'COFFEE',
    description: 'Equal parts robust espresso and silky textured milk with sweetened condensed milk and dusted with fresh Ceylon cinnamon.',
    price: 39000,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=1000&auto=format&fit=crop',
    tags: ['VEGETARIAN'],
    available: true,
    bestseller: false,
    calories: 210,
    preparationTime: '4 mins',
    customization: {
      milk: ['Full Cream', 'Oat Milk (+Rp 8.000)'],
      sugar: ['Normal Sugar', 'Less Sugar'],
      ice: ['Hot', 'Normal Ice', 'Less Ice']
    }
  },
  {
    id: 'yuzu-sparkling-cold-brew',
    name: 'Yuzu Sparkling Cold Brew',
    category: 'COFFEE',
    description: '18-hour cold steeped Arabica infused with Japanese Kochi yuzu extract, Mediterranean tonic water, and charred rosemary sprig.',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1000&auto=format&fit=crop',
    tags: ['LOW SUGAR', 'DAIRY FREE'],
    available: true,
    bestseller: false,
    calories: 85,
    preparationTime: '3 mins',
    customization: {
      sugar: ['Normal Sugar', 'Less Sugar', 'No Sugar'],
      ice: ['Normal Ice', 'Less Ice']
    }
  },
  {
    id: 'earl-grey-berry-tart',
    name: 'Earl Grey Raspberry Tart',
    category: 'DESSERT',
    description: 'Crisp French almond sablé crust filled with Bergamot-infused ganache, topped with fresh Malang raspberries and edible cornflower.',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1000&auto=format&fit=crop',
    tags: ['VEGETARIAN'],
    available: false, // Demo out-of-stock item
    bestseller: false,
    calories: 290,
    preparationTime: 'Ready to serve'
  },
  {
    id: 'avocado-sourdough-toast',
    name: 'Truffled Avocado Toast',
    category: 'FOOD',
    description: 'Chunky smashed Hass avocado on grilled sourdough, topped with poached organic egg, dukkah spices, cherry tomatoes, and microgreens.',
    price: 52000,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000&auto=format&fit=crop',
    tags: ['VEGETARIAN', 'CHEF PICK'],
    available: true,
    bestseller: false,
    calories: 420,
    preparationTime: '10 mins'
  },
  {
    id: 'valrhona-chocolate-ganache',
    name: 'Valrhona 70% Dark Chocolate',
    category: 'NON-COFFEE',
    description: 'Rich melted French Valrhona Guanaja dark chocolate steamed with velvety milk, pinch of Maldon sea salt, and cocoa dusting.',
    price: 44000,
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=1000&auto=format&fit=crop',
    tags: ['VEGETARIAN'],
    available: true,
    bestseller: false,
    calories: 310,
    preparationTime: '4 mins',
    customization: {
      milk: ['Full Cream', 'Oat Milk (+Rp 8.000)', 'Almond Milk (+Rp 8.000)'],
      sugar: ['Normal Sugar', 'Less Sugar'],
      ice: ['Hot', 'Normal Ice']
    }
  }
];

export const CATEGORIES = [
  'ALL',
  'SIGNATURE',
  'COFFEE',
  'NON-COFFEE',
  'FOOD',
  'DESSERT'
] as const;

export const DIETARY_TAGS = [
  'VEGETARIAN',
  'DAIRY FREE',
  'LOW SUGAR',
  'CHEF PICK'
] as const;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
}
