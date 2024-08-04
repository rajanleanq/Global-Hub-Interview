import React from "react";
import { useParams } from "react-router";
import { IPokemonDetail } from "../../data/entity";
import { cn, formatNumberWithLeadingZeros } from "../../../../core/lib/utils";
import { image_base_url } from "../../../../core/constant/endpoints";
import { Button } from "../../../../components/atom/button/button";

export default function PokemonDetails({
  data: pokemonDetail,
}: {
  data: IPokemonDetail;
}) {
  const { id } = useParams();

  return (
    <>
      <div className="flex flex-row items-start gap-20">
        <div className="flex flex-col gap-1 justify-center items-center mx-auto">
          <p className="font-semibold sm:text-2xl xs:text-xl text-gray-900 text-center capitalize">
            {pokemonDetail?.name}
          </p>
          <p className="text-gray-500 font-semibold text-center xs:text-md sm:text-xl">
            #{formatNumberWithLeadingZeros(Number(id), 3)}
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
    </>
  );
}
