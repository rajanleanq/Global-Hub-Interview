import React from "react";
import Navbar from "../navbar/navbar";
import PokemonFilter from "../pokemon-filter/pokemon-filter";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full h-full flex flex-1">
        <PokemonFilter />
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
}
