import { Link, useParams } from "react-router-dom";
import DetailPageLayout from "./components/layout/detail-page-layout";
import { image_base_url } from "../../core/constant/endpoints";
import {
  cn,
  formatNumberWithLeadingZeros,
  generateRandomHexColor,
} from "../../core/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "./data/api";
import Progress from "../../components/atom/progress/progress";
import { Button } from "../../components/atom/button/button";
import { routes } from "../../core/constant/routes";
import { useEffect } from "react";
export default function PokemonDetailPage() {
  const { id } = useParams();
  const { data, refetch } = useQuery({
    queryKey: ["pokemon-detail"],
    queryFn: async () => await fetchPokemonDetails({ name: id as string }),
  });
  const physical_info = [
    {
      name: "Height",
      value: data?.height,
    },
    {
      name: "Weight",
      value: data?.weight + " kg",
    },
    {
      name: "Base Experience",
      value: data?.base_experience,
    },
    {
      name: "Abilities",
      value: data?.abilities?.map((p) => p?.ability?.name)?.join(" ,"),
    },
  ];
  useEffect(() => {
    refetch();
  }, []);
  return (
    <DetailPageLayout>
      <Link
        to={routes?.homepage}
        className="absolute top-6 left-6 hover:text-blue-400 hover:underline"
      >
        <p>Back</p>
      </Link>
      <div className="2xl:w-1/3 xl:w-1/2 lg:max-w-[60%] md:max-w-[70%] p-6 my-10 mx-auto">
        <div className=" flex flex-col gap-8">
          <div className="flex flex-row items-start gap-20">
            <div className="flex flex-col gap-1 justify-center items-center mx-auto">
              <p className="font-semibold text-2xl text-gray-900 text-center capitalize">
                {data?.name}
              </p>
              <p className="text-gray-500 font-semibold text-center text-xl">
                {formatNumberWithLeadingZeros(Number(id), 3)}
              </p>
            </div>
          </div>

          <div className="bg-dark-blue-gradient p-10 rounded-[40px] shadow-xl w-[290px] mx-auto">
            <img src={image_base_url(id as string)} />
          </div>
          <div className="flex gap-2 items-center justify-center">
            {data?.types?.map((p) => (
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

              {data?.stats ? (
                data?.stats?.map((p) => (
                  <div className="flex items-center gap-6" key={p?.stat?.name}>
                    <p className="text-md font-medium text-gray-600 underline capitalize min-w-[120px]">
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
                    <p className="text-md font-medium text-gray-600 underline capitalize ">
                      {p?.name}:&nbsp;
                    </p>
                    <p className="text-md font-medium text-gray-600 capitalize">
                      {p?.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  );
}
