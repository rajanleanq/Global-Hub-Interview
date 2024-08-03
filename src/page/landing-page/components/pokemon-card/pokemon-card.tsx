import { Link } from "react-router-dom";
import { formatNumberWithLeadingZeros } from "../../../../lib/utils";
import { routes } from "../../../../constant/routes";

interface IPokemonCard {
  img_alt: string;
  title: string;
  item_index: number;
}
export default function PokemonCard({
  img_alt,
  title,
  item_index,
}: IPokemonCard) {
  const getImgUrl = () => {
    return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${formatNumberWithLeadingZeros(
      item_index,
      3
    )}.png`;
  };
  return (
    <Link
      to={routes?.detail_page(item_index)}
      className="flex flex-col gap-3 bg-sky-gradient h-max p-6 rounded-xl shadow-sm cursor-pointer hover:scale-110 transition-all ease-in-out duration-150 hover:shadow-lg hover:brightness-90"
    >
      <img src={getImgUrl()} alt={img_alt} className="w-24" />
      <div className="flex flex-col gap-1">
        <p className="text-center capitalize font-semibold text-sm ">{title}</p>

        <p className="text-center capitalize font-medium text-sm text-gray-600">
          ({formatNumberWithLeadingZeros(item_index, 3)})
        </p>
      </div>
    </Link>
  );
}
