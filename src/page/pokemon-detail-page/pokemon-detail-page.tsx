import { Link } from "react-router-dom";
import DetailPageLayout from "./components/layout/detail-page-layout";
import { routes } from "../../constant/routes";
export default function PokemonDetailPage() {
  return (
    <DetailPageLayout>
      <div className=" w-max mt-10 mx-auto">
        <div className="flex gap-12">
          <Link to={routes?.homepage}>Back</Link>
          <div className=" flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-2xl text-gray-900 text-center">
                Rajan Raj Shah
              </p>
              <p className="text-gray-500 font-semibold text-center text-xl">
                001
              </p>
            </div>
            <div className="bg-dark-blue-gradient p-10 rounded-[40px] shadow-xl w-[80%] mx-auto">
              <img src="https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/001.png" />
            </div>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  );
}
