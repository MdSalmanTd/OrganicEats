import Link from "next/link";
import React from "react";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { AuthButton } from "./_components/auth-button";
import { MenuCards } from './_components/menu-cards';

export default async function Home() {
  const foods = await api.food.getAll();
  const session = await auth();

  return (
    <HydrateClient>
      <main className="relative min-h-screen pt-20 sm:pt-24 pb-8 px-4 overflow-hidden bg-white">
        <div className="text-center mb-8 space-y-2 animate-float max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800">What are you craving?</h1>
        <p className="text-stone-500 text-base sm:text-lg">Swipe to explore our organic kitchen</p>
      </div>
         <MenuCards items={foods} />
      </main>
    </HydrateClient>
  );
}
