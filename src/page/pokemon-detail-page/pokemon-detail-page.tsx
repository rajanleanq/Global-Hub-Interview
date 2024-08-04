import { Link, useParams } from "react-router-dom";
import DetailPageLayout from "./components/layout/detail-page-layout";
import { image_base_url } from "../../core/constant/endpoints";
import { DetermineGenderRate, cn, formatNumberWithLeadingZeros } from "../../core/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPokemonDetails,
  fetchPokemonEvolutionChain,
  fetchPokemonSpeciesDetail,
} from "./data/api";
import Progress from "../../components/atom/progress/progress";
import { Button } from "../../components/atom/button/button";
import { routes } from "../../core/constant/routes";
import { useEffect } from "react";
import PokemonCard from "../landing-page/components/pokemon-card/pokemon-card";
import { Chain, EvolvesTo, EvolvesTo2 } from "./data/entity";
import arrow_img from "../../assets/img/arrow.png";
export default function PokemonDetailPage() {
  const { id } = useParams();
  const { data: pokemonDetail, refetch: refetchPokemonDetail } = useQuery({
    queryKey: ["pokemon-detail"],
    enabled: false,
    queryFn: async () => await fetchPokemonDetails({ name: id as string }),
  });
  const { data: evolutionChainData, refetch: refetchEvolutionChain } = useQuery(
    {
      queryKey: ["pokemon-evolution-chain"],
      enabled: false,
      queryFn: async () =>
        await fetchPokemonEvolutionChain({ name: id as string }),
    }
  );
  const { data: pokemonSpeciesDetail, refetch: refetchPokemonSpecies } =
    useQuery({
      queryKey: ["pokemon-species-chain"],
      enabled: false,
      queryFn: async () =>
        await fetchPokemonSpeciesDetail({ name: id as string }),
    });
  const physical_info: { name: string; value: string | number }[] = [
    {
      name: "Height",
      value: pokemonDetail?.height as number,
    },
    {
      name: "Weight",
      value: pokemonDetail?.weight + " kg",
    },
    {
      name: "Base Experience",
      value: pokemonDetail?.base_experience as number,
    },
    {
      name: "Abilities",
      value: pokemonDetail?.abilities?.map((p) => p?.ability?.name)?.join(" ,") as string,
    },
    {
      name: "Gender",
      value: DetermineGenderRate(pokemonSpeciesDetail?.gender_rate as number),
    },
    {
      name: "Habitat",
      value: pokemonSpeciesDetail?.habitat?.name as string,
    },
    {
      name: "Shape",
      value: pokemonSpeciesDetail?.shape?.name as string,
    },
    {
      name: "Capture Rate",
      value: pokemonSpeciesDetail?.capture_rate as number,
    },
  ];
  useEffect(() => {
    refetchPokemonDetail();
    refetchEvolutionChain();
    refetchPokemonSpecies();
  }, [id]);
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
    <DetailPageLayout>
      <Link
        to={routes?.homepage}
        className="absolute top-6 left-6 hover:text-blue-400 hover:underline"
      >
        <p>Back</p>
      </Link>
      <div className="2xl:w-1/3 xl:w-[60%] lg:w-[60%] md:max-w-[70%] p-6 my-10 mx-auto">
        <div className=" flex flex-col gap-8 w-full">
          <div className="flex flex-row items-start gap-20">
            <div className="flex flex-col gap-1 justify-center items-center mx-auto">
              <p className="font-semibold sm:text-2xl xs:text-xl text-gray-900 text-center capitalize">
                {pokemonDetail?.name}
              </p>
              <p className="text-gray-500 font-semibold text-center xs:text-md sm:text-xl">
                {formatNumberWithLeadingZeros(Number(id), 3)}
              </p>
            </div>
          </div>

          <div className="bg-dark-blue-gradient p-10 rounded-[40px] shadow-xl sm:w-[290px] xs:w-[70%] mx-auto">
            <img src={image_base_url(id as string)} className="w-full" />
          </div>
          <div className="flex gap-2 items-center justify-center">
            {pokemonDetail?.types?.map((p) => (
              <Button
                key={p?.type?.name}
                className={cn("capitalize w-max bg-yellow-600 text-white")}
              >
                {p?.type?.name}
              </Button>
            ))}
          </div>
          <div className=" flex flex-col gap-12 mt-8">
            <div className=" flex flex-col gap-2">
              <p className="text-md font-medium border-b pb-1 mb-3">Stats</p>

              {pokemonDetail?.stats ? (
                pokemonDetail?.stats?.map((p) => (
                  <div className="flex items-center gap-6" key={p?.stat?.name}>
                    <p className="xs:text-sm sm:text-md font-medium text-gray-600 underline capitalize min-w-[120px]">
                      {p?.stat?.name?.replaceAll("-", " ")}
                    </p>
                    <Progress percentage={p?.base_stat} />
                  </div>
                ))
              ) : (
                <p>No Stats</p>
              )}
            </div>
            <div>
              <p className="text-md font-medium border-b pb-1 mb-3">Profile</p>
              <div className="grid xs:grid-cols-1 sm:grid-cols-2  justify-between gap-2">
                {physical_info?.map((p) => (
                  <div className="flex gap-1" key={p?.name}>
                    <p className="xs:text-sm sm:text-md font-medium text-gray-600 underline capitalize ">
                      {p?.name}:&nbsp;
                    </p>
                    <p className="xs:text-sm sm:text-md font-medium text-gray-600 capitalize">
                      {p?.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-md font-medium border-b pb-1 mb-3">
                Evolution
              </p>
              {buildChain()?.children?.map((p) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  );
}
