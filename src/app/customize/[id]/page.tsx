'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronRight, ArrowLeft, CheckCircle, Loader2, ChefHat, Info } from 'lucide-react';
import { api } from '~/trpc/react';

interface AddOn {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function CustomizePage() {
  const { id } = useParams();
  const router = useRouter();

  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  // Fetch food & add-ons using tRPC
  const { data: food, isLoading: foodLoading } = api.food.getById.useQuery({ id: id as string });
  const { data: availableAddOns = [], isLoading: addOnsLoading } = api.addOn.getAll.useQuery();

  const loading = foodLoading || addOnsLoading;

  // Toggle add-ons
  const toggleIngredient = (ing: AddOn) => {
    if (selectedAddOns.find(i => i.id === ing.id)) {
      setSelectedAddOns(prev => prev.filter(i => i.id !== ing.id));
    } else {
      if (selectedAddOns.length >= 6) return;
      setSelectedAddOns(prev => [...prev, ing]);
    }
  };

  const handleProceed = () => {
    if (!food) return;
    const addOnCalories = selectedAddOns.reduce((sum, addon) => sum + addon.calories, 0);
    const addOnProtein = selectedAddOns.reduce((sum, addon) => sum + addon.protein, 0);
    const addOnCarbs = selectedAddOns.reduce((sum, addon) => sum + addon.carbs, 0);
    const addOnFat = selectedAddOns.reduce((sum, addon) => sum + addon.fat, 0);

    const orderData = {
      foodId: food.id,
      foodName: food.name,
      foodImage: food.image,
      addOnIds: selectedAddOns.map(a => a.id),
      addOns: selectedAddOns,
      totalCalories: food.baseCalories + addOnCalories,
      totalProtein: food.baseProtein + addOnProtein,
      totalCarbs: food.baseCarbs + addOnCarbs,
      totalFat: food.baseFat + addOnFat,
      totalFiber: 5 + selectedAddOns.length,
    };

    // Store in session storage and navigate
    sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));
    router.push('/review');
  };

  if (loading || !food) return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="animate-spin text-green-600 w-10 h-10" />
    </div>
  );

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 px-4 sm:px-6 lg:px-8 animate-fade-in bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <button onClick={() => router.push('/')} className="flex items-center text-stone-500 hover:text-stone-800 mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Menu
        </button>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Food Info */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden h-56 sm:h-64 shadow-lg">
              <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-4 sm:p-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{food.name}</h2>
              </div>
            </div>

            {/* Base Nutrition */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <h3 className="font-semibold text-stone-800 flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-green-600" /> Base Nutrition
              </h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-stone-50 p-3 rounded-lg">
                  <div className="text-xl font-bold text-stone-800">{food.baseCalories}</div>
                  <div className="text-xs text-stone-500">kcal</div>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg">
                  <div className="text-xl font-bold text-stone-800">{food.baseProtein}g</div>
                  <div className="text-xs text-stone-500">Pro</div>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg">
                  <div className="text-xl font-bold text-stone-800">{food.baseCarbs}g</div>
                  <div className="text-xs text-stone-500">Carb</div>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg">
                  <div className="text-xl font-bold text-stone-800">{food.baseFat}g</div>
                  <div className="text-xs text-stone-500">Fat</div>
                </div>
              </div>
            </div>

            {/* Default Ingredients */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <h3 className="font-semibold text-stone-800 flex items-center gap-2 mb-4">
                <ChefHat className="w-5 h-5 text-green-600" /> Default Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {food.defaultIngredients.map((ing, idx) => (
                  <span key={idx} className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-sm">{ing}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-fit">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-stone-800 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-green-600" /> Add Extra Goodness
              </h3>
              <span className={`text-sm ${selectedAddOns.length === 6 ? 'text-red-500 font-bold' : 'text-stone-400'}`}>
                {selectedAddOns.length} / 6 selected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableAddOns.map(ing => {
                const isSelected = !!selectedAddOns.find(i => i.id === ing.id);
                return (
                  <button
                    key={ing.id}
                    onClick={() => toggleIngredient(ing)}
                    disabled={!isSelected && selectedAddOns.length >= 6}
                    className={`relative p-4 rounded-xl text-left transition-all duration-200 border
                      ${isSelected ? 'bg-green-50 border-green-500 ring-1 ring-green-500' : 'bg-white border-stone-200 hover:border-green-300'}
                      ${(!isSelected && selectedAddOns.length >= 6) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-medium text-stone-800">{ing.name}</div>
                    <div className="text-xs text-stone-500 capitalize">{ing.category}</div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-stone-200 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="hidden sm:block">
            <div className="text-stone-500 text-sm">Your creation</div>
            <div className="font-bold text-stone-800">{food.name} + {selectedAddOns.length} extras</div>
          </div>
          <button
            onClick={handleProceed}
            className="w-full sm:w-auto bg-stone-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            Review & Analyze <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}