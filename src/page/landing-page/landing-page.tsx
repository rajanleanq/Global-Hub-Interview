import React from "react";
import { IPokemonResult, fetchPokemon } from "./data/api";
import { useQuery } from "@tanstack/react-query";
import LandingPageLayout from "./components/layout/landing-page-layout";
import PokemonCard from "./components/pokemon-card/pokemon-card";
import Skeleton from "../../components/molecule/skeleton/skeleton";
import { getIdFromUrl } from "../../lib/utils";

export default function LandingPage() {
  const { data, isFetching } = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => await fetchPokemon({ limit: 40, offset: 0 }),
  });

  return (
    <LandingPageLayout>
      <div className="flex flex-wrap gap-6 p-6 justify-start items-start">
        {!isFetching &&
          data?.results?.map((p: IPokemonResult) => (
            <PokemonCard
              key={p?.name}
              title={p?.name}
              img_alt={p?.name}
              item_index={Number(getIdFromUrl(p?.url))}
            />
          ))}
          {isFetching && Array?.from({length: 25}, (_, i) => <Skeleton key={i} />)}
      </div>
    </LandingPageLayout>
  );
}
