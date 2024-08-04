import { useEffect, useState } from "react";
import { fetchPokemon } from "./data/api";
import { useQuery } from "@tanstack/react-query";
import LandingPageLayout from "./components/layout/landing-page-layout";
import PokemonCard from "./components/pokemon-card/pokemon-card";
import Skeleton from "../../components/molecule/skeleton/skeleton";
import { getIdFromUrl } from "../../core/lib/utils";
import useStore from "../../store/store";
import MobileViewFilter from "./components/pokemon-filter/mobile-view-filter/mobile-view-filter";
import { Button } from "../../components/atom/button/button";
import FilterSvg from "../../assets/svg/filter.svg";
import FilterDrawer from "./components/pokemon-filter/mobile-view-filter/component/filter-drawer";
import { IPokemonResult } from "./data/entity";
export default function LandingPage() {
  const [drawer, setDrawer] = useState<boolean>(false);
  const { setPokemon, pokemons, name, pokemonDataLoading } = useStore();
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
      <div className="p-6 flex flex-col gap-6">
        <div className="xs:flex md:hidden gap-2 w-full ">
          <MobileViewFilter />
          <Button
            onClick={() => setDrawer(true)}
            variant={"secondary"}
            className="bg-blue-400 rounded-lg w-max"
          >
            <img src={FilterSvg} alt="filter" className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-6">
          {(!isFetching && !pokemonDataLoading) &&
            pokemons?.map((p: IPokemonResult) => (
              <PokemonCard
                key={p?.name}
                title={p?.name}
                img_alt={p?.name}
                item_index={Number(getIdFromUrl(p?.url))}
              />
            ))}
          {(isFetching || pokemonDataLoading) &&
            Array?.from({ length: 25 }, (_, i) => <Skeleton key={i} />)}
          {pokemons?.length === 0 && (
            <h2 className="text-xl">
              No results found with keyword "
              <span className="font-semibold text-red-600">{name}</span>"
            </h2>
          )}
        </div>
      </div>
      <FilterDrawer
        isOpen={drawer}
        onClose={() => setDrawer(false)}
        title={"Filter"}
      />
    </LandingPageLayout>
  );
}
