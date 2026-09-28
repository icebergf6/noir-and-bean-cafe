export type ProductCategory = 'ALL' | 'COFFEE' | 'NON-COFFEE' | 'FOOD' | 'DESSERT' | 'SIGNATURE';

export type DietaryTag = 'VEGETARIAN' | 'DAIRY FREE' | 'LOW SUGAR' | 'GLUTEN FREE' | 'CHEF PICK';

export interface ProductCustomizationOptions {
  milk?: ('Full Cream' | 'Oat Milk (+Rp 8.000)' | 'Almond Milk (+Rp 8.000)')[];
  sugar?: ('Normal Sugar' | 'Less Sugar' | 'No Sugar')[];
  ice?: ('Normal Ice' | 'Less Ice' | 'No Ice' | 'Hot')[];
  size?: ('Regular' | 'Large (+Rp 6.000)')[];
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number; // in IDR (Rp)
  image: string;
  tags: DietaryTag[];
  available: boolean;
  bestseller: boolean;
  calories?: number;
  preparationTime?: string;
  customization?: ProductCustomizationOptions;
}

export interface SelectedCustomization {
  milk?: string;
  sugar?: string;
  ice?: string;
  size?: string;
  notes?: string;
}

export interface CartItem {
  id: string; // unique cart line ID
  productId: string;
  name: string;
  price: number;
  unitPriceWithAddons: number;
  image: string;
  quantity: number;
  customization: SelectedCustomization;
  customizationSummary: string;
}
