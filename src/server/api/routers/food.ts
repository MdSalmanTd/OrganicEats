import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const foodRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const foods = await ctx.db.food.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: "asc" },
    });
    return foods;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const food = await ctx.db.food.findUnique({
        where: { id: input.id },
      });
      return food;
    }),
});
