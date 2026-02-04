export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

export interface Ingredient {
  _id: string;
  name: string;
  category: 'vegetable' | 'protein' | 'dairy' | 'grain' | 'spice';
  icon?: string;
}

export interface FoodItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  defaultIngredients: string[];
  baseNutrition: NutritionalInfo;
}

export interface Order {
  _id: string;
  foodName: string;
  addOns: Ingredient[];
  nutrition: NutritionalInfo;
  totalCalories: number;
  timestamp: string;
  status: 'confirmed';
}

export interface OrderState {
  step: 'boot' | 'selection' | 'customization' | 'summary';
  selectedFood: FoodItem | null;
  selectedAddOns: Ingredient[];
  finalNutrition: NutritionalInfo | null;
  isLoading: boolean;
}

export enum AppStep {
  BOOT = 'boot',
  SELECTION = 'selection',
  CUSTOMIZATION = 'customization',
  SUMMARY = 'summary',
}