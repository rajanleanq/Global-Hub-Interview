import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { IPokemonDetail } from "../../../data/entity";
import PokemonDetails from "../pokemon-detail";
import mockJson from "./pokenmon-detail.mock.json";
import { image_base_url } from "../../../../../core/constant/endpoints";

const mockPokemonDetail: IPokemonDetail = mockJson as any;

describe("PokemonDetails", () => {
  test("renders PokemonDetails with valid data", () => {
    render(
      <Router>
        <PokemonDetails data={mockPokemonDetail} />
      </Router>
    );

    expect(screen.getByText(/venusaur/i)).toBeInTheDocument();
  });

  test("handles missing pokemonDetail gracefully", () => {
    render(
      <Router>
        <PokemonDetails data={{} as IPokemonDetail} />
      </Router>
    );

    expect(screen.queryByText(/venusaur/i)).not.toBeInTheDocument();
    expect(screen.queryByText("#003")).not.toBeInTheDocument();
  });

  test("renders buttons for Pokemon types", () => {
    render(
      <Router>
        <PokemonDetails data={mockPokemonDetail} />
      </Router>
    );

    const button = screen.getByRole("button", { name: /grass/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("capitalize w-max bg-yellow-600 text-white");
  });
});
