'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, Loader2, Sparkles } from 'lucide-react';
import { api } from '~/trpc/react';
import { useSession } from 'next-auth/react';

interface OrderData {
  foodId: string;
  foodName: string;
  foodImage: string;
  addOnIds: string[];
  addOns: Array<{ id: string; name: string; category: string }>;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
}

export default function ReviewPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createOrder = api.order.create.useMutation({
    onSuccess: () => {
      sessionStorage.removeItem('pendingOrder');
      router.push('/orders');
    },
    onError: (error) => {
      alert('Failed to create order: ' + error.message);
      setIsSubmitting(false);
    },
  });

  useEffect(() => {
    const data = sessionStorage.getItem('pendingOrder');
    if (data) {
      setOrderData(JSON.parse(data) as OrderData);
    } else {
      router.push('/');
    }
  }, [router]);

  const handleConfirmOrder = () => {
    if (!session) {
      alert('Please sign in to place an order');
      return;
    }

    if (!orderData) return;

    setIsSubmitting(true);
    createOrder.mutate({
      foodId: orderData.foodId,
      addOnIds: orderData.addOnIds,
      totalCalories: orderData.totalCalories,
      totalProtein: orderData.totalProtein,
      totalCarbs: orderData.totalCarbs,
      totalFat: orderData.totalFat,
      totalFiber: orderData.totalFiber,
    });
  };

  if (!orderData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-green-600 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-stone-500 hover:text-stone-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-green-600" />
            Review Your Order
          </h1>
          <p className="text-stone-600">Check your customization before placing the order</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden mb-6">
          {/* Food Image */}
          <div className="h-64 overflow-hidden relative">
            <img
              src={orderData.foodImage}
              alt={orderData.foodName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-3xl font-bold">{orderData.foodName}</h2>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Add-ons */}
            {orderData.addOns.length > 0 && (
              <div>
                <h3 className="font-semibold text-stone-800 mb-3">Your Add-ons</h3>
                <div className="flex flex-wrap gap-2">
                  {orderData.addOns.map((addon) => (
                    <span
                      key={addon.id}
                      className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200"
                    >
                      {addon.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Nutrition Breakdown */}
            <div>
              <h3 className="font-semibold text-stone-800 mb-4">Total Nutrition</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                  <div className="text-2xl font-bold text-green-700">{orderData.totalCalories}</div>
                  <div className="text-xs text-green-600 font-medium">Calories</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                  <div className="text-2xl font-bold text-blue-700">{orderData.totalProtein.toFixed(1)}g</div>
                  <div className="text-xs text-blue-600 font-medium">Protein</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                  <div className="text-2xl font-bold text-amber-700">{orderData.totalCarbs.toFixed(1)}g</div>
                  <div className="text-xs text-amber-600 font-medium">Carbs</div>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-100">
                  <div className="text-2xl font-bold text-rose-700">{orderData.totalFat.toFixed(1)}g</div>
                  <div className="text-xs text-rose-600 font-medium">Fat</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.back()}
            className="flex-1 px-6 py-4 rounded-xl border-2 border-stone-300 text-stone-700 font-semibold hover:bg-stone-50 transition-colors"
          >
            Modify Order
          </button>
          <button
            onClick={handleConfirmOrder}
            disabled={isSubmitting || !session}
            className="flex-1 px-6 py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Placing Order...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Confirm Order
              </>
            )}
          </button>
        </div>

        {!session && (
          <p className="text-center text-sm text-red-600 mt-4">
            Please sign in to place an order
          </p>
        )}
      </div>
    </div>
  );
}
