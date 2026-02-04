"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <button
        disabled
        className="rounded-full bg-green-600/50 px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-white opacity-50 cursor-not-allowed"
      >
        <span className="hidden sm:inline">Loading...</span>
        <span className="sm:hidden">...</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => (session ? signOut() : signIn("google"))}
      className="rounded-full bg-green-600 hover:bg-green-700 px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-white transition-all shadow-md hover:shadow-lg"
    >
      {session ? (
        <span className="hidden sm:inline">Sign out</span>
      ) : (
        <span className="hidden sm:inline">Sign in with Google</span>
      )}
      {session ? (
        <span className="sm:hidden">Out</span>
      ) : (
        <span className="sm:hidden">Sign in</span>
      )}
    </button>
  );
}
