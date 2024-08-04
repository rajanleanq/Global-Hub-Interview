import React from "react";
import Navbar from "../navbar/navbar";
import PokemonFilter from "../pokemon-filter/pokemon-filter";

/**
 * Renders the layout for the landing page.
 *
 * @param {Object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to render.
 * @return {JSX.Element} The rendered landing page layout.
 */

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
