"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";
import type { ReactNode } from "react";

import type { FoodItem, Ingredient, NutritionalInfo } from "~/app/types";

/* ----------------------------- */
/* Context Type */
/* ----------------------------- */

type SessionContextType = {
  selectedFood: FoodItem | null;
  setSelectedFood: (food: FoodItem | null) => void;

  selectedAddOns: Ingredient[];
  setSelectedAddOns: (addons: Ingredient[]) => void;

  finalNutrition: NutritionalInfo | null;
  setFinalNutrition: (nutrition: NutritionalInfo | null) => void;
};

/* ----------------------------- */

const SessionContext =
  createContext<SessionContextType | null>(null);

/* ----------------------------- */
/* Provider */
/* ----------------------------- */

export function SessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedFood, setSelectedFood] =
    useState<FoodItem | null>(null);

  const [selectedAddOns, setSelectedAddOns] =
    useState<Ingredient[]>([]);

  const [finalNutrition, setFinalNutrition] =
    useState<NutritionalInfo | null>(null);

  return (
    <SessionContext.Provider
      value={{
        selectedFood,
        setSelectedFood,
        selectedAddOns,
        setSelectedAddOns,
        finalNutrition,
        setFinalNutrition,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

/* ----------------------------- */
/* Hook */
/* ----------------------------- */

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error(
      "useSession must be used inside SessionProvider"
    );
  }

  return context;
}
