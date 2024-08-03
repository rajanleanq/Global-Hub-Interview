import { Route, Routes } from "react-router";
import LandingPage from "../page/landing-page/landing-page";
import PokemonDetailPage from "../page/pokemon-detail-page/pokemon-detail-page";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
    </Routes>
  );
}
