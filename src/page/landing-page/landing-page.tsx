import { useEffect } from "react";
import { IPokemonResult, fetchPokemon } from "./data/api";
import { useQuery } from "@tanstack/react-query";
import LandingPageLayout from "./components/layout/landing-page-layout";
import PokemonCard from "./components/pokemon-card/pokemon-card";
import Skeleton from "../../components/molecule/skeleton/skeleton";
import { getIdFromUrl } from "../../core/lib/utils";
import useStore from "../../store/store";

export default function LandingPage() {
  const { setPokemon, pokemons,name } = useStore();
  const { data, isFetching } = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => await fetchPokemon({ limit: 1000, offset: 0 }),
  });
  useEffect(() => {
    if (!isFetching) {
      setPokemon(data?.results as IPokemonResult[]);
    }
  }, [isFetching]);
  return (
    <LandingPageLayout>
      <div className="flex flex-wrap gap-6 p-6">
        {!isFetching &&
          pokemons?.map((p: IPokemonResult) => (
            <PokemonCard
              key={p?.name}
              title={p?.name}
              img_alt={p?.name}
              item_index={Number(getIdFromUrl(p?.url))}
            />
          ))}
        {isFetching &&
          Array?.from({ length: 25 }, (_, i) => <Skeleton key={i} />)}
          
           {pokemons?.length === 0 && <h2 className="text-xl">No results found with keyword "<span className="font-semibold text-red-600">{name}</span>"</h2>}
      </div>
    </LandingPageLayout>
  );
}
