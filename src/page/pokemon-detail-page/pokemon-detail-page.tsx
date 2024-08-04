import { Link, useParams } from "react-router-dom";
import DetailPageLayout from "./components/layout/detail-page-layout";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "./data/api";
import { routes } from "../../core/constant/routes";
import { useEffect } from "react";
import PokemonEvolution from "./components/pokemon-evolution/pokemom-evolution";
import { IPokemonDetail } from "./data/entity";
import PokemonInfo from "./components/pokemon-info/pokemon-info";
import PokemonStats from "./components/pokemon-stats/pokemon-stats";
import PokemonDetails from "./components/pokemon-detail/pokemon-detail";
export default function PokemonDetailPage() {
  const { id } = useParams();
  const { data: pokemonDetail, isFetched } = useQuery({
    queryKey: ["pokemon-detail"],
    enabled: !!id,
    staleTime: 0,
    queryFn: async () => await fetchPokemonDetails({ name: id as string }),
  });
  return (
    <DetailPageLayout>
      <Link
        to={routes?.homepage}
        className="absolute top-6 left-6 hover:text-blue-400 hover:underline"
      >
        <p>Back</p>
      </Link>
      <div className="2xl:w-1/3 xl:w-[60%] lg:w-[60%] md:max-w-[70%] p-6 my-10 mx-auto">
        <div className=" flex flex-col gap-8 w-full">
          <PokemonDetails data={pokemonDetail as IPokemonDetail} />
          <div className=" flex flex-col gap-12 mt-8">
            <PokemonInfo
              isFetched={isFetched}
              data={pokemonDetail as IPokemonDetail}
            />
            <PokemonStats data={pokemonDetail as IPokemonDetail} />
            <PokemonEvolution data={pokemonDetail as IPokemonDetail} />
          </div>
        </div>
      </div>
    </DetailPageLayout>
  );
}
