import Progress from "../../../../components/atom/progress/progress";
import InputSkeleton from "../../../../components/molecule/skeleton/input-skeleton";
import { IPokemonDetail } from "../../data/entity";

export default function PokemonInfo({
  data,
  isFetched,
}: {
  data: IPokemonDetail;
  isFetched: boolean;
}) {
  return (
    <div className=" flex flex-col gap-2">
      <p className="text-md font-medium border-b pb-1 mb-3">Stats</p>
      {isFetched ? (
        <>
          {data?.stats ? (
            data?.stats?.map((p) => (
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
        </>
      ) : (
        <InputSkeleton />
      )}
    </div>
  );
}
