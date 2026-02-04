import { FoodItem, Ingredient } from '~/app/types';

export const FOOD_ITEMS: FoodItem[] = [
  {
    _id: 'pizza-1',
    name: 'Rustic Organic Pizza',
    description: 'Wood-fired crust topped with heirloom tomatoes and fresh basil.',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&h=400&fit=crop',
    defaultIngredients: ['Organic Flour Dough', 'Tomato Sauce', 'Mozzarella', 'Basil', 'Olive Oil'],
    baseNutrition: { calories: 280, protein: 12, carbs: 35, fat: 10 }
  },
  {
    _id: 'soup-veg',
    name: 'Garden Vegetable Soup',
    description: 'A hearty blend of seasonal root vegetables in a clear broth.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    defaultIngredients: ['Vegetable Broth', 'Carrots', 'Celery', 'Potatoes', 'Peas'],
    baseNutrition: { calories: 150, protein: 5, carbs: 25, fat: 3 }
  },
  {
    _id: 'curry-nonveg',
    name: 'Chicken Curry Bowl',
    description: 'Free-range chicken simmered in coconut milk and aromatic spices.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop',
    defaultIngredients: ['Chicken Breast', 'Coconut Milk', 'Curry Paste', 'Potatoes', 'Cilantro'],
    baseNutrition: { calories: 450, protein: 35, carbs: 20, fat: 25 }
  },
  {
    _id: 'platter-chick',
    name: 'Grilled Chicken Platter',
    description: 'Lemon-herb marinated chicken served with quinoa.',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&h=400&fit=crop',
    defaultIngredients: ['Chicken Thighs', 'Quinoa', 'Lemon', 'Garlic', 'Parsley'],
    baseNutrition: { calories: 520, protein: 45, carbs: 40, fat: 18 }
  },
  {
    _id: 'pie-savory',
    name: 'Spinach & Feta Pie',
    description: 'Flaky pastry filled with organic spinach and sheep feta.',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&h=400&fit=crop',
    defaultIngredients: ['Puff Pastry', 'Spinach', 'Feta Cheese', 'Eggs', 'Onion'],
    baseNutrition: { calories: 380, protein: 14, carbs: 30, fat: 22 }
  }
];

export const ADD_ON_INGREDIENTS: Ingredient[] = [
  { _id: 'ing-1',
     name: 'Carrot',
     category: 'vegetable'
  },
  { _id: 'ing-2', name: 'Onion', category: 'vegetable' },
  { _id: 'ing-3', name: 'Beetroot', category: 'vegetable' },
  { _id: 'ing-4', name: 'Spinach', category: 'vegetable' },
  { _id: 'ing-5', name: 'Grilled Fish', category: 'protein' },
  { _id: 'ing-6', name: 'Tofu', category: 'protein' },
  { _id: 'ing-7', name: 'Chicken Bits', category: 'protein' },
  { _id: 'ing-8', name: 'Mushrooms', category: 'vegetable' },
  { _id: 'ing-9', name: 'Cheddar', category: 'dairy' },
  { _id: 'ing-10', name: 'Chili Flakes', category: 'spice' },
  { _id: 'ing-11', name: 'Corn', category: 'vegetable' },
  { _id: 'ing-12', name: 'Boiled Egg', category: 'protein' },
];