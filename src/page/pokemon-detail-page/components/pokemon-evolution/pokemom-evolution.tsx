import PokemonCard from "../../../landing-page/components/pokemon-card/pokemon-card";
import { EvolvesTo, EvolvesTo2, IPokemonDetail } from "../../data/entity";
import { fetchPokemonEvolutionChain } from "../../data/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import arrow_img from "../../../../assets/img/arrow.png";
import InputSkeleton from "../../../../components/molecule/skeleton/input-skeleton";

export default function PokemonEvolution({
  data: pokemonDetail,
}: {
  data: IPokemonDetail;
}) {
  const { id } = useParams();
  const {
    data: evolutionChainData,
    isFetched,
  } = useQuery({
    queryKey: ["pokemon-evolution-chain"],
    enabled: !!id,
    staleTime: 0,
    queryFn: async () =>
      await fetchPokemonEvolutionChain({ name: id as string }),
  });
  const recursiveBuildChain = (currGen: EvolvesTo | EvolvesTo2) => {
    const id = currGen.species.url.split("/").slice(-2, -1)[0];

    // If there are no further evolutions, return the current species details
    if (!currGen.evolves_to.length) {
      return { result: [], id, name: currGen.species.name };
    }

    // Recursively build the chain for each child evolution
    const result = currGen.evolves_to.map((child) =>
      recursiveBuildChain(child as EvolvesTo | EvolvesTo2)
    ) as { result: { id: string; name: string }[]; id: string; name: string }[];

    return { result, id, name: currGen.species.name };
  };

  const buildChain = () => {
    const chain = evolutionChainData?.chain;
    const id = chain?.species?.url.split("/").slice(-2, -1)[0];

    // Check if there are any evolutions and build the chain
    const children = chain?.evolves_to.length
      ? chain.evolves_to.map((e) => recursiveBuildChain(e))
      : [];

    return { children, id, name: chain?.species.name };
  };
  return (
    <div>
      <p className="text-md font-medium border-b pb-1 mb-3">Evolution</p>

      {isFetched ? (
        buildChain()?.children?.map((p) => (
          <div
            key={p?.id}
            className="flex gap-2 items-center xs:flex-col sm:flex-row"
          >
            <PokemonCard
              img_alt={pokemonDetail?.name as string}
              title={pokemonDetail?.name as string}
              item_index={Number(pokemonDetail?.id)}
            />
            <img
              src={arrow_img}
              alt="arrow"
              className="w-10 h-max xs:rotate-90 xs:my-3 sm:my-0 sm:rotate-0"
            />
            <PokemonCard
              img_alt={p?.name}
              title={p?.name}
              item_index={Number(p?.id)}
            />
            {p?.result &&
              p?.result?.length > 0 &&
              p?.result?.map((r) => (
                <div
                  key={p?.id}
                  className="flex items-center gap-2 xs:flex-col sm:flex-row"
                >
                  <img
                    src={arrow_img}
                    alt="arrow"
                    className="w-10 h-max xs:rotate-90 xs:my-3 sm:my-0 sm:rotate-0"
                  />
                  <PokemonCard
                    key={r?.name}
                    img_alt={r?.name}
                    title={r?.name}
                    item_index={Number(r?.id)}
                  />
                  {r?.result &&
                    r?.result?.length > 0 &&
                    r?.result?.map((j) => (
                      <div className="flex items-center gap-2 xs:flex-col sm:flex-row">
                        <img
                          src={arrow_img}
                          alt="arrow"
                          className="w-10 h-max xs:rotate-90 xs:my-3 sm:my-0 sm:rotate-0"
                        />
                        <PokemonCard
                          key={j?.name}
                          img_alt={j?.name}
                          title={j?.name}
                          item_index={Number(j?.id)}
                        />
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))
      ) : (
        <InputSkeleton />
      )}
    </div>
  );
}
