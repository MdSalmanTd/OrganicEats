'use client';

import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface FoodItem {
  id: string;
  name: string;
  description: string;
  image: string;
  defaultIngredients: string[];
  baseCalories: number;
  baseProtein: number;
  baseCarbs: number;
  baseFat: number;
}

interface MenuCardsProps {
  items: FoodItem[];
}

export function MenuCards({ items }: MenuCardsProps) {
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);

  const handleSelect = (food: FoodItem) => {
    router.push(`/customize/${food.id}`);
  };

  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-6 sm:py-10">
      <motion.div
        className="flex gap-3 sm:gap-6 px-2 sm:px-0"
        animate={{
          x: isPaused ? undefined : [0, -100 * items.length * 3],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: items.length * 8,
            ease: "linear",
          },
        }}
        onHoverStart={() => setIsPaused(true)}
        onHoverEnd={() => setIsPaused(false)}
      >
        {duplicatedItems.map((food, index) => (
          <motion.div
            key={`${food.id}-${index}`}
            onClick={() => handleSelect(food)}
            className="shrink-0 w-[280px] xs:w-[320px] sm:w-[360px] md:w-[400px] bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden cursor-pointer border border-stone-100"
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                <h3 className="text-xl sm:text-2xl font-bold">{food.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-green-500/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-semibold">
                    Organic
                  </span>
                  <span className="text-xs sm:text-sm opacity-90">{food.baseCalories} kcal</span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <p className="text-stone-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{food.description}</p>
              
              <div className="mb-3 sm:mb-4">
                <div className="flex gap-2 sm:gap-4 text-xs sm:text-sm flex-wrap">
                  <div>
                    <span className="text-stone-500">Protein:</span>
                    <span className="ml-1 font-semibold text-stone-800">{food.baseProtein}g</span>
                  </div>
                  <div>
                    <span className="text-stone-500">Carbs:</span>
                    <span className="ml-1 font-semibold text-stone-800">{food.baseCarbs}g</span>
                  </div>
                  <div>
                    <span className="text-stone-500">Fat:</span>
                    <span className="ml-1 font-semibold text-stone-800">{food.baseFat}g</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-sm sm:text-base">
                Order Now <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
