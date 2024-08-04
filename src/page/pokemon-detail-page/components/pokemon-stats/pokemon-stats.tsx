import { useQuery } from "@tanstack/react-query";
import { fetchPokemonSpeciesDetail } from "../../data/api";
import { useParams } from "react-router";
import { IPokemonDetail } from "../../data/entity";
import { DetermineGenderRate } from "../../../../core/lib/utils";
import InputSkeleton from "../../../../components/molecule/skeleton/input-skeleton";

export default function PokemonStats({
  data: pokemonDetail,
}: {
  data: IPokemonDetail;
}) {
  const { id } = useParams();
  const {
    data: pokemonSpeciesDetail,
    isFetched,
  } = useQuery({
    queryKey: ["pokemon-stats"],
    enabled: !!id,
    staleTime: 0,
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
      value: pokemonDetail?.abilities
        ?.map((p) => p?.ability?.name)
        ?.join(" ,") as string,
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
  return (
    <div>
      <p className="text-md font-medium border-b pb-1 mb-3">Profile</p>
      {isFetched ? (
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
      ) : (
        <InputSkeleton />
      )}
    </div>
  );
}
