import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.orderAddOn.deleteMany();
  await prisma.order.deleteMany();
  await prisma.addOn.deleteMany();
  await prisma.food.deleteMany();

  // Seed Food Items
  console.log('Adding food items...');
  const foods = [
    {
      id: 'pizza-1',
      name: 'Rustic Organic Pizza',
      description: 'Wood-fired crust topped with heirloom tomatoes and fresh basil.',
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&h=400&fit=crop',
      defaultIngredients: ['Organic Flour Dough', 'Tomato Sauce', 'Mozzarella', 'Basil', 'Olive Oil'],
      baseCalories: 280,
      baseProtein: 12,
      baseCarbs: 35,
      baseFat: 10,
      isAvailable: true,
    },
    {
      id: 'soup-veg',
      name: 'Garden Vegetable Soup',
      description: 'A hearty blend of seasonal root vegetables in a clear broth.',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
      defaultIngredients: ['Vegetable Broth', 'Carrots', 'Celery', 'Potatoes', 'Peas'],
      baseCalories: 150,
      baseProtein: 5,
      baseCarbs: 25,
      baseFat: 3,
      isAvailable: true,
    },
    {
      id: 'curry-nonveg',
      name: 'Chicken Curry Bowl',
      description: 'Free-range chicken simmered in coconut milk and aromatic spices.',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop',
      defaultIngredients: ['Chicken Breast', 'Coconut Milk', 'Curry Paste', 'Potatoes', 'Cilantro'],
      baseCalories: 450,
      baseProtein: 35,
      baseCarbs: 20,
      baseFat: 25,
      isAvailable: true,
    },
    {
      id: 'platter-chick',
      name: 'Grilled Chicken Platter',
      description: 'Lemon-herb marinated chicken served with quinoa.',
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&h=400&fit=crop',
      defaultIngredients: ['Chicken Thighs', 'Quinoa', 'Lemon', 'Garlic', 'Parsley'],
      baseCalories: 520,
      baseProtein: 45,
      baseCarbs: 40,
      baseFat: 18,
      isAvailable: true,
    },
    {
      id: 'pie-savory',
      name: 'Spinach & Feta Pie',
      description: 'Flaky pastry filled with organic spinach and sheep feta.',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&h=400&fit=crop',
      defaultIngredients: ['Puff Pastry', 'Spinach', 'Feta Cheese', 'Eggs', 'Onion'],
      baseCalories: 380,
      baseProtein: 14,
      baseCarbs: 30,
      baseFat: 22,
      isAvailable: true,
    },
  ];

  for (const food of foods) {
    await prisma.food.create({ data: food });
  }
  console.log(`✅ Created ${foods.length} food items`);

  // Seed Add-ons
  console.log('Adding add-on ingredients...');
  const addOns = [
    { id: 'ing-1', name: 'Carrot', category: 'vegetable', calories: 20, protein: 2, carbs: 3, fat: 1 },
    { id: 'ing-2', name: 'Onion', category: 'vegetable', calories: 18, protein: 1.5, carbs: 4, fat: 0.5 },
    { id: 'ing-3', name: 'Beetroot', category: 'vegetable', calories: 22, protein: 2, carbs: 5, fat: 0.5 },
    { id: 'ing-4', name: 'Spinach', category: 'vegetable', calories: 15, protein: 2.5, carbs: 2, fat: 0.5 },
    { id: 'ing-5', name: 'Grilled Fish', category: 'protein', calories: 80, protein: 15, carbs: 0, fat: 2 },
    { id: 'ing-6', name: 'Tofu', category: 'protein', calories: 60, protein: 8, carbs: 2, fat: 3.5 },
    { id: 'ing-7', name: 'Chicken Bits', category: 'protein', calories: 70, protein: 12, carbs: 0, fat: 2.5 },
    { id: 'ing-8', name: 'Mushrooms', category: 'vegetable', calories: 12, protein: 1.5, carbs: 2, fat: 0.5 },
    { id: 'ing-9', name: 'Cheddar', category: 'dairy', calories: 50, protein: 4, carbs: 0.5, fat: 4 },
    { id: 'ing-10', name: 'Chili Flakes', category: 'spice', calories: 5, protein: 0.5, carbs: 1, fat: 0.5 },
    { id: 'ing-11', name: 'Corn', category: 'vegetable', calories: 30, protein: 2, carbs: 6, fat: 0.5 },
    { id: 'ing-12', name: 'Boiled Egg', category: 'protein', calories: 70, protein: 6, carbs: 1, fat: 5 },
  ];

  for (const addOn of addOns) {
    await prisma.addOn.create({ data: addOn });
  }
  console.log(`✅ Created ${addOns.length} add-on ingredients`);

  console.log('✨ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
