import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const addOnRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const addOns = await ctx.db.addOn.findMany({
      where: { isAvailable: true },
      orderBy: { category: "asc" },
    });
    return addOns;
  }),
});
