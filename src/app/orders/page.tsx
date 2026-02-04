'use client';

import { useRouter } from 'next/navigation';
import { Loader2, Package, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { api } from '~/trpc/react';
import { useSession } from 'next-auth/react';

export default function OrdersPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: orders, isLoading } = api.order.getMyOrders.useQuery(undefined, {
    enabled: !!session,
  });

  if (!session) {
    return (
      <div className="min-h-screen pt-20 sm:pt-24 pb-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Please Sign In</h2>
          <p className="text-stone-600">You need to sign in to view your orders</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-green-600 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-stone-500 hover:text-stone-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Menu
        </button>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-2">My Orders</h1>
          <p className="text-stone-600">Track your organic meal orders</p>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-12 text-center">
            <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-stone-800 mb-2">No orders yet</h3>
            <p className="text-stone-600 mb-6">Start by customizing your first meal!</p>
            <button
              onClick={() => router.push('/')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.food.image}
                      alt={order.food.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-base sm:text-lg text-stone-800 truncate">{order.food.name}</h3>
                      <p className="text-xs sm:text-sm text-stone-500">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start">
                    {order.status === 'pending' && (
                      <span className="bg-yellow-100 text-yellow-700 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden xs:inline">Pending</span>
                        <span className="xs:hidden">⏱️</span>
                      </span>
                    )}
                    {order.status === 'confirmed' && (
                      <span className="bg-green-100 text-green-700 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden xs:inline">Confirmed</span>
                        <span className="xs:hidden">✓</span>
                      </span>
                    )}
                  </div>
                </div>

                {order.addOns.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs sm:text-sm text-stone-600 mb-2">Add-ons:</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {order.addOns.map((orderAddOn) => (
                        <span
                          key={orderAddOn.id}
                          className="bg-stone-100 text-stone-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs"
                        >
                          {orderAddOn.addOn.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-stone-100">
                  <div className="text-center">
                    <div className="text-sm sm:text-base font-bold text-stone-800">{order.totalCalories}</div>
                    <div className="text-xs text-stone-500">kcal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm sm:text-base font-bold text-stone-800">{order.totalProtein.toFixed(1)}g</div>
                    <div className="text-xs text-stone-500">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm sm:text-base font-bold text-stone-800">{order.totalCarbs.toFixed(1)}g</div>
                    <div className="text-xs text-stone-500">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm sm:text-base font-bold text-stone-800">{order.totalFat.toFixed(1)}g</div>
                    <div className="text-xs text-stone-500">Fat</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
