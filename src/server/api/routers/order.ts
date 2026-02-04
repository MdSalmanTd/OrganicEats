import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const orderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        foodId: z.string(),
        addOnIds: z.array(z.string()),
        totalCalories: z.number(),
        totalProtein: z.number(),
        totalCarbs: z.number(),
        totalFat: z.number(),
        totalFiber: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.create({
        data: {
          userId: ctx.session.user.id,
          foodId: input.foodId,
          totalCalories: input.totalCalories,
          totalProtein: input.totalProtein,
          totalCarbs: input.totalCarbs,
          totalFat: input.totalFat,
          totalFiber: input.totalFiber,
          status: "pending",
          addOns: {
            create: input.addOnIds.map((addOnId) => ({
              addOnId,
            })),
          },
        },
        include: {
          food: true,
          addOns: {
            include: {
              addOn: true,
            },
          },
        },
      });
      return order;
    }),

  getMyOrders: protectedProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.order.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        food: true,
        addOns: {
          include: {
            addOn: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return orders;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.id, userId: ctx.session.user.id },
        include: {
          food: true,
          addOns: {
            include: {
              addOn: true,
            },
          },
        },
      });
      return order;
    }),
});
